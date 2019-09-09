import { Map, View } from "ol";
import Feature from "ol/Feature";
import WKT from "ol/format/WKT";
import Point from "ol/geom/Point";
import {
  Group as LayerGroup,
  Tile as TileLayer,
  Vector as VectorLayer
} from "ol/layer.js";
import "ol/ol.css";
import { OSM, Vector as VectorSource, XYZ } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createLayer, zoomToExtent } from "../actions/actions-layer";
import FileDrop from "react-file-drop";
import shp from "shpjs";

class MapView extends React.Component {
  render() {
    return (
      <FileDrop onDrop={this.props.createLayer}>
        <div className={"map-view"} ref="mapContainer">
          {" "}
        </div>
      </FileDrop>
    );
  }

  componentDidMount() {
    // create feature layer and vector source
    var featuresLayer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });

    const backSattelite = new TileLayer({
      title: "آفلاین ماهواره ای",
      baseLayer: true,
      displayInLayerSwitcherImage: true,
      displayInLayerSwitcher: false,
      // minResolution: 5,
      logo: "http://192.168.1.3/" + "geosuite/api/mbtile/sattlite/0/0/0",

      source: new XYZ({
        url: "http://192.168.1.3/" + "geosuite/api/mbtile/sattlite/{z}/{x}/{y}"
        // crossOrigin: "Anonymous"
      })
    });

    // create map object with feature layer
    var map = new Map({
      target: this.refs.mapContainer,
      layers: this.props.layers,
      view: new View({
        center: [-11718716.28195593, 4869217.172379018], //Boulder, CO
        zoom: 13
      })
    });

    // save map and layer references to local state
    this.setState({
      map: map,
      featuresLayer: featuresLayer
    });

    map.on("click", this.handleMapClick.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.featuresLayer.setSource(new VectorSource());
    this.state.map.setLayerGroup(
      new LayerGroup({
        layers: this.props.layers
      })
    );

    if (this.props.extent != null) {
      this.state.map.getView().fit(this.props.extent);
    }
  }

  handleMapClick(event) {
    // create WKT writer
    var wktWriter = new WKT();

    // derive map coordinate (references map from Wrapper Component state)
    var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

    // create Point geometry from clicked coordinate
    var point = new Point(clickedCoordinate);

    let feature = new Feature(point);
    this.props.layers[1].getSource().addFeature(feature);

    // write Point geometry to WKT with wktWriter
    let clickedPointWkt = wktWriter.writeGeometry(point);

    // place Flux Action call to notify Store map coordinate was clicked
    // Actions.setRoutingCoord( clickedPointWkt );
  }
}

function mapStateToProps(state) {
  return {
    layers: state.layers,
    extent: state.extent
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createLayer: createLayer,
      zoomToExtent: zoomToExtent
    },
    dispatch
  );
}

module.exports = connect(
  mapStateToProps,
  matchDispatchToProps
)(MapView);
