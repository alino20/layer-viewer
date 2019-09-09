import { combineReducers } from "redux";
import LayerReducer from "./reducer-layers";
import ExtentReducer from "./reducer-extent";

const allReducers = combineReducers({
  layers: LayerReducer,
  extent: ExtentReducer
});

export default allReducers;
