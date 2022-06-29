import {
  ADD_CANVAS_INFO,
  UPDATE_CANVAS_INFO,
  SET_CLIENTX,
  SET_CLIENTY,
  SET_TARGET_ELEMENT,
} from '../types';

const CanvasReducer = (state, action) => {
 switch (action.type) {
   case ADD_CANVAS_INFO:
     return {
       ...state,
       canvasInfo: [...state.canvasInfo, action.payload],
     };
   case UPDATE_CANVAS_INFO:
     return {
       ...state,
       canvasInfo: state.canvasInfo.map((element) => {
        if(element.id === action.payload.id) {
          let newElement = {
            ...element,
            innerText: action.payload?.innerText ?  action.payload?.innerText : element?.innerText,
            style: {
              ...element.style,
              left: action.payload?.style?.left ?  action.payload?.style?.left : element?.style?.left,
              top: action.payload?.style?.top ?  action.payload?.style?.top : element?.style?.top,
              width: action.payload?.style?.width ?  action.payload?.style?.width : element?.style?.width,
              height: action.payload?.style?.height ?  action.payload?.style?.height : element?.style?.height,
              backgroundColor: action.payload?.style?.backgroundColor ?  action.payload?.style?.backgroundColor : element?.style?.backgroundColor,
              color: action.payload?.style?.color ?  action.payload?.style?.color : element?.style?.color,
              padding: action.payload?.style?.padding ?  action.payload?.style?.padding : element?.style?.padding,
            }
          }
          return newElement;
        } 
        return element;
       })
     };
    case SET_CLIENTX:
        return {
          ...state,
          clientX: action.payload
        };
    case SET_CLIENTY:
        return {
          ...state,
          clientY: action.payload
        };
    case SET_TARGET_ELEMENT: 
        return {
          ...state,
          targetElement: action.payload
        };
   default:
     throw new Error(`Unsupported type of: ${action.type}`);
 }
};

export default CanvasReducer;