import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleLayer, removeLayer } from "../actions/actions-layer";

class LayersList extends React.Component {
  handleToggle(layer) {
    layer.setVisible(!layer.getVisible());
  }

  render() {
    return (
      <List className="side" subheader={<ListSubheader>Layers</ListSubheader>}>
        {this.props.layers.map((layer, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem
              key={index}
              role={undefined}
              dense={true}
              button
              onClick={() => this.props.toggleLayer(index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={layer.getVisible()}
                  tabIndex={-1}
                  disableRipple={true}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={layer.get("title")} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => this.props.removeLayer(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
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
      removeLayer: removeLayer
    },
    dispatch
  );
}

module.exports = connect(
  mapStateToProps,
  matchDispatchToProps
)(LayersList);
