import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import { Map, View } from "ol";
import Feature from "ol/Feature";
import WKT from "ol/format/WKT";
import Point from "ol/geom/Point";
import { Group as LayerGroup } from "ol/layer.js";
import "ol/ol.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import FileDrop from "react-file-drop";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createLayer, zoomToExtent } from "../actions/actions-layer";
import CreateLayerDialog from "../components/create-layer-dialog";



const MapView = props => {
  const [map, setMap] = useState(null);

  function handleMapClick(event) {
    // create WKT writer
    var wktWriter = new WKT();

    // derive map coordinate (references map from Wrapper Component state)
    var clickedCoordinate = map.getCoordinateFromPixel(event.pixel);

    // create Point geometry from clicked coordinate
    var point = new Point(clickedCoordinate);

    let feature = new Feature(point);
    props.layers[1].getSource().addFeature(feature);

    // write Point geometry to WKT with wktWriter
    let clickedPointWkt = wktWriter.writeGeometry(point);
    console.log(clickedPointWkt);
  }

  useLayoutEffect(() => {
    setMap(
      new Map({
        target: "mapContainer",
        layers: props.layers,
        view: new View({
          center: [-11718716.28195593, 4869217.172379018], //Boulder, CO
          zoom: 13,
          minZoom: 2,
          extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
        })
      })
    );
  }, []);

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setLayerGroup(
        new LayerGroup({
          layers: props.layers
        })
      );

      if (props.extent != null) {
        map.getView().fit(props.extent);
      }
    }
  });

  const useStyles = makeStyles(theme => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    paper: {
      width: "80%",
      display: "inline-block",
      verticalAlign: "top",
      height: "100%"
    }
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paper} square={true}>
      <FileDrop onDrop={props.createLayer}>
        <div className={"map-view"} id="mapContainer">
          {" "}
        </div>
      </FileDrop>
    
        {/* <Fab aria-label={"Add"} className={classes.fab} color={'primary'}>
          <AddIcon/>
        </Fab> */}

        <CreateLayerDialog></CreateLayerDialog>
    </Paper>
  );
};

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
