import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeLayer, toggleLayer, zoomToExtent } from "../actions/actions-layer";
import LayerMenu from "../components/layer-menu";

const LayersList = props => {
  const styles = {
    width: "20%",
    display: "inline-block",
    verticalAlign: "top",
    height: "100%",
    backgroundColor: "azure"
  };

  return (
    <Paper style={styles}>
      <List className="side" subheader={<ListSubheader>Layers</ListSubheader>}>
        {props.layers.map((layer, index) => {
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
                  onClick={() => props.toggleLayer(index)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={layer.get("title")} />
              <LayerMenu
                removeLayer={props.removeLayer}
                index={index}
                zoomToExtent={props.zoomToExtent}
                layer={layer}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

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
