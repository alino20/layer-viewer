export const ADD_LAYER = "ADD_LAYER";
export const TOGGLE_LAYER = "TOGGLE_LAYER";
export const REMOVE_LAYER = "REMOVE_LAYER";

export function addLayer(text) {
  return {
    type: ADD_LAYER,
    payload: text
  };
}

export function toggleLayer(index) {
  return {
    type: TOGGLE_LAYER,
    payload: index
  };
}

export function removeLayer(index) {
  return {
    type: REMOVE_LAYER,
    payload: index
  };
}
