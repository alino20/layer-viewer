import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  removeLayer,
  toggleLayer,
  zoomToExtent
} from "../actions/actions-layer";
import LayerMenu from "../components/layer-menu";

class LayersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      open: false
    });
  }

  handleToggle(layer) {
    layer.setVisible(!layer.getVisible());
  }

  render() {
    const ITEM_HEIGHT = 48;

    return (
      <List className="side" subheader={<ListSubheader>Layers</ListSubheader>}>
        {this.props.layers.map((layer, index) => {
          const labelId = `checkbox-list-label-${index}`;
          return (
            <ListItem
              key={index + " " + layer.get("title")}
              role={undefined}
              dense={true}
              button
              disableRipple={true}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={layer.getVisible()}
                  tabIndex={-1}
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={() => this.props.toggleLayer(index)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={layer.get("title")} />
              <LayerMenu
                removeLayer={this.props.removeLayer}
                index={index}
                zoomToExtent={this.props.zoomToExtent}
                layer={layer}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    layers: state.layers
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleLayer: toggleLayer,
      removeLayer: removeLayer,
      zoomToExtent: zoomToExtent
    },
    dispatch
  );
}

module.exports = connect(
  mapStateToProps,
  matchDispatchToProps
)(LayersList);
