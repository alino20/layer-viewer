import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import CreateWfsForm from "./create-wfs-form";
import CreateWmsForm from "./create-wms-form";

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

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleTabChange(_event, newValue) {
    setValue(newValue);
  }

  const handleTextChange = name => event => {
    setLayer({ ...layer, [name]: event.target.value });
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
        fullWidth
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
          <CreateWmsForm setOpen={setOpen} handleClose={handleClose} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateWfsForm setOpen={setOpen} handleClose={handleClose} />
        </TabPanel>
      </Dialog>
    </Fragment>
  );
};

module.exports = CreateLayerDialog;
