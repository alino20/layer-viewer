import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PaletteIcon from "@material-ui/icons/Palette";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import React, { Fragment, useState } from "react";
import { isArray } from "util";

const StyleDialog = props => {
  const [open, setOpen] = useState(false);
  var s;
  if (typeof props.layer.getStyle() === "object") {
    if (isArray(props.layer.getStyle())) {
      s = props.layer.getStyle()[0];
    } else {
      s = props.layer.getStyle()[0];
    }
  } else {
    s = props.layer.getStyle()()[0];
  }

  const [style, setStyle] = useState(
    typeof props.layer.getStyle() === "object"
      ? isArray(props.layer.getStyle())
        ? {
            strokeColor: props.layer.getStyle()[0].getStroke().color_,
            strokeWidth: props.layer.getStyle()[0].getStroke().width_,
            fillColor: props.layer.getStyle()[0].getFill().color_
          }
        : {
            strokeColor: props.layer.getStyle().getStroke().color_,
            strokeWidth: props.layer.getStyle().getStroke().width_,
            fillColor: props.layer.getStyle().getFill().color_
          }
      : {
          strokeColor: props.layer
            .getStyle()()[0]
            .getStroke().color_,
          strokeWidth: props.layer
            .getStyle()()[0]
            .getStroke().width_,
          fillColor: props.layer
            .getStyle()()[0]
            .getFill().color_
        }
  );

  function handelOpen() {
    setOpen(true);
    props.handleClose();
  }

  function handleClose() {
    setOpen(false);
  }

  const handleTextChange = name => event => {
    setStyle({ ...style, [name]: event.target.value });
  };

  function submit() {
    let layerStyles = [
      new Style({
        stroke: new Stroke({
          color: style.strokeColor,
          width: style.strokeWidth
        }),
        fill: new Fill({
          color: style.fillColor
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: style.strokeColor,
            width: style.strokeWidth
          }),
          fill: new Fill({
            color: style.fillColor
          }),
        })
      })
    ];

    props.layer.setStyle(layerStyles);
    handleClose();
  }

  return (
    <Fragment>
      <MenuItem onClick={handelOpen}>
        <PaletteIcon />
        Style
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="wms-dialog-title">Layer Style</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DialogContentText>Stroke</DialogContentText>
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                id="strokeColor"
                label="Stroke Color"
                type="text"
                fullWidth
                value={style.strokeColor}
                onChange={handleTextChange("strokeColor")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                id="strokeWidth"
                label="Stroke Width"
                type="text"
                fullWidth
                value={style.strokeWidth}
                onChange={handleTextChange("strokeWidth")}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>FIll</DialogContentText>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoFocus
                id="fillColor"
                label="Fill Color"
                type="text"
                fullWidth
                value={style.fillColor}
                onChange={handleTextChange("fillColor")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

module.exports = StyleDialog;
