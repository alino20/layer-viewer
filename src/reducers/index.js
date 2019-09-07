import { combineReducers } from "redux";
import LayerReducer from "./reducer-layers";

const allReducers = combineReducers({
  layers: LayerReducer
});

export default allReducers;
