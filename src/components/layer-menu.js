import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Vector as VectorLayer } from "ol/layer.js";
import StyleDialog from "../components/style-dialog";

const ITEM_HEIGHT = 48;

export default function LayerMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <ListItemSecondaryAction>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 200
          }
        }}
      >
        <MenuItem
          onClick={() => {
            if (props.layer instanceof VectorLayer) {
              if (props.layer.getSource().getFeatures().length > 0) {
                let extent = props.layer.getSource().getExtent();
                props.zoomToExtent(extent);
              } else {
                props.zoomToExtent([
                  -10013188.195,
                  -10024483.05,
                  10013188.195,
                  10024483.05
                ]);
              }
            } else {
              props.zoomToExtent(props.layer.getExtent());
            }
            handleClose();
          }}
        >
          <FullScreenIcon />
          Zoom
        </MenuItem>
        {props.layer instanceof VectorLayer && (
          <StyleDialog handleClose={handleClose} layer={props.layer} />
        )}
        {props.layer.get("removeable") && (
          <MenuItem
            onClick={() => {
              props.removeLayer(props.index);
              handleClose();
            }}
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
      </Menu>
    </ListItemSecondaryAction>
  );
}
