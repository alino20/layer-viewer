import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLayer } from "../actions/actions-layer";

const CreateWfsForm = props => {
  const [layer, setLayer] = React.useState({
    url:
      "https://ahocevar.com/geoserver/wfs?service=WFS&" +
      "version=1.1.0&request=GetFeature&typename=osm:water_areas&" +
      "outputFormat=application/json&srsname=EPSG:3857",
    name: "Water Areas"
  });

  function createWFSLayer() {
    props.setOpen(false);
    props.addLayer(
      new VectorLayer({
        title: layer.name,
        removeable: true,
        source: new VectorSource({
          format: new GeoJSON(),
          url: function(extent) {
            return layer.url + "&" + "bbox=" + extent.join(",") + ",EPSG:3857";
          }
        })
      })
    );
  }

  const handleTextChange = name => event => {
    setLayer({ ...layer, [name]: event.target.value });
  };

  return (
    <Fragment>
      <DialogTitle id="form-dialog-title">Add WFS Layer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a WFS layer to map, please enter the layer WFS URL.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="wmsUrl"
          label="WMS URL"
          type="url"
          fullWidth
          value={layer.url}
          onChange={handleTextChange("url")}
        />
        <DialogContentText>WFS Layers</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="layers"
          label="Layers"
          type="text"
          fullWidth
          value={layer.name}
          onChange={handleTextChange("layers")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={createWFSLayer} color="primary">
          Add
        </Button>
      </DialogActions>
    </Fragment>
  );
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addLayer: addLayer
    },
    dispatch
  );
}

module.exports = connect(
  null,
  matchDispatchToProps
)(CreateWfsForm);
