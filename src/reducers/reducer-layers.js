import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { OSM, Vector as VectorSource, XYZ } from "ol/source.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import Point from "ol/geom/Point";
import { TOGGLE_LAYER, REMOVE_LAYER } from "../actions/actions-layer";

export default function(state = null, action) {
  switch (action.type) {
    case TOGGLE_LAYER:
      return state.map((layer, index) => {
        if (index === action.payload) {
          layer.setVisible(!layer.getVisible());
        }
        return layer;
      });
    case REMOVE_LAYER:
      return state.filter((_layer, index) => {
        return action.payload != index;
      });

    default:
      return [
        new TileLayer({
          id: 1,
          visible: true,
          source: new OSM(),
          title: "OSM"
        }),
        new VectorLayer({
          id: 2,
          title: "User Layer",
          visible: true,
          source: new VectorSource({
            features: []
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({
                color: "red"
              })
            }),
            geometry: function(feature) {
              // return the coordinates of the first ring of the polygon
              var coordinates = feature.getGeometry().getCoordinates();
              return new Point(coordinates);
            }
          })
        })
      ];
  }
}
