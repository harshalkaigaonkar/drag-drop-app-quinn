import React, { useReducer } from 'react';
import CanvasContext from './CanvasContext';
import CanvasReducer from './CanvasReducer';
import {
 ADD_CANVAS_INFO,
 UPDATE_CANVAS_INFO,
 SET_CLIENTX,
 SET_CLIENTY,
 SET_TARGET_ELEMENT
} from '../types';

// Set CLientX
export const setClientX = (dispatch, payload) => {
  dispatch({ type: SET_CLIENTX, payload });
};
// Set CLientY
export const setClientY = (dispatch, payload) => {
  dispatch({ type: SET_CLIENTY, payload });
};
// Set Target Element
export const setTargetElement = (dispatch, payload) => {
  dispatch({ type: SET_TARGET_ELEMENT, payload });
};
// Set Canvas Info
export const addCanvasInfo = (dispatch, payload) => {
  dispatch({ type: ADD_CANVAS_INFO, payload });
};
// Update Canvas Info
export const updateCanvasInfo = (dispatch, payload) => {
  dispatch({ type: UPDATE_CANVAS_INFO, payload });
};

const CanvasState = (props) => {
  const initialState = {
    targetElement: null,
    canvasInfo: [],
    clientX: null,
    clientY: null
  };

  const [state, dispatch] = useReducer(CanvasReducer, initialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CanvasContext.Provider>
  );
};

export default CanvasState;