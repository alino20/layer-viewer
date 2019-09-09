import {ZOOM_TO_EXTENT} from "../actions/actions-layer";

export default function(state = null, action) {
    switch(action.type){
        case ZOOM_TO_EXTENT:
            if(action.payload){
                return action.payload;
            }
        default:
            return null;
    }
}