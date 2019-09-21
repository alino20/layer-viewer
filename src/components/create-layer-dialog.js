import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { Tile as TileLayer } from "ol/layer.js";
import { TileWMS } from "ol/source.js";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addLayer } from "../actions/actions-layer";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const CreateLayerDialog = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [layer, setLayer] = React.useState({
      url: "http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv",
      layers: "gebco_latest",
      projection:'EPSG:4326'
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function createLayer() {
    setOpen(false);
    props.addLayer(
      new TileLayer({
        extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
        title: layer.layers,
        removeable: true,
        source: new TileWMS({
          url:layer.url,
          params: { layers: layer.layers , TILED: true },
          projection: layer.projection,
          serverType: "geoserver"
          // Countries have transparency, so do not fade tiles:
        })
      })
    );
  }

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  const handleTextChange = name => event => {
    setLayer({ ...layer, [name]: event.target.value });
    console.log(layer);
  };

  return (
    <Fragment>
      <Fab
        aria-label={"Add"}
        className={classes.fab}
        color={"secondary"}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="WMS" />
          <Tab label="WFS" />
        </Tabs>
        <TabPanel value={value} index={0}>
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
            <DialogContentText>Projection</DialogContentText>
            <Select
              value={layer.projection}
              onChange={handleTextChange("projection")}
              inputProps={{
                name: "projection",
                id: "projection"
              }}
              fullWidth
            >
              <MenuItem value={'EPSG:4326'}>EPSG:4326</MenuItem>
              <MenuItem value={'EPSG:3857'}>EPSG:3857</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={createLayer} color="primary">
              Add
            </Button>
          </DialogActions>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </TabPanel>
      </Dialog>
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
)(CreateLayerDialog);
