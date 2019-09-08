import GeoJSON from "ol/format/GeoJSON.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import shp from "shpjs";

export const LOAD_LAYER = "LOAD_LAYER";
export const CREATE_LAYER = "CREATE_LAYER";
export const ADD_LAYER = "ADD_LAYER";
export const TOGGLE_LAYER = "TOGGLE_LAYER";
export const REMOVE_LAYER = "REMOVE_LAYER";

export function loadLayer() {
  return {
    type: LOAD_LAYER
  };
}

export function createLayer(files, event) {
  return function(dispatch) {
    dispatch(loadLayer());

    console.log(files, event);
    console.log(files[0]);

    let reader = new FileReader();
    reader.onload = function() {
      console.log("DONE");

      shp(this.result)
        .then(
          geoJSON => {
            console.log(geoJSON);
            let vectorSource = new VectorSource({
              features: (new GeoJSON()).readFeatures(geoJSON,{
                featureProjection: 'EPSG:3857'
              })
            });

            return new VectorLayer({
              source: vectorSource,
              title: geoJSON.fileName,
              removeable: true
            });
          },
          error => {
            console.log(er);
          }
        )
        .then(layer => {
          dispatch(addLayer(layer));
        });
    };

    reader.onerror = function() {
      console.log(this.error);
    };

    reader.onprogress = function() {
      console.log("READING");
    };

    reader.readAsArrayBuffer(files[0]);
  };
}

export function addLayer(layer) {

  console.log(layer);

  return {
    type: ADD_LAYER,
    payload: layer
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
