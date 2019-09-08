import React from "react";
import MapView from "../containers/mapview";
import TabPanel from "./tab-panel";
import LayersList from "../containers/layers-list";

const App = () => (
  <div>
    <LayersList />
    <MapView />
  </div>
);

module.exports = App;
