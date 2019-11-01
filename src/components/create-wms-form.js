import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Tile as TileLayer } from "ol/layer.js";
import { TileWMS } from "ol/source.js";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLayer } from "../actions/actions-layer";

const CreateWmsForm = props => {
  const [layer, setLayer] = React.useState({
    url:
      "http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv",
    layers: "gebco_latest"
  });

  function createWMSLayer() {
    props.setOpen(false);
    props.addLayer(
      new TileLayer({
        extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
        title: layer.layers,
        removeable: true,
        source: new TileWMS({
          url: layer.url,
          params: { layers: layer.layers, TILED: true },
          serverType: "geoserver"
          // Countries have transparency, so do not fade tiles:
        })
      })
    );
  }

  const handleTextChange = name => event => {
    setLayer({ ...layer, [name]: event.target.value });
  };

  return (
      <Fragment>
          <DialogTitle id="wms-dialog-title">Add WMS Layer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a WMS layer to map, please enter WMS service URL here.
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
            <DialogContentText>WMS Layers</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="layers"
              label="Layers"
              type="text"
              fullWidth
              value={layer.layers}
              onChange={handleTextChange("layers")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={createWMSLayer} color="primary">
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
  )(CreateWmsForm);
