import React, { useContext } from 'react';
import CanvasContext from '../../context/canvas/CanvasContext';
import { updateCanvasInfo } from '../../context/canvas/CanvasState';
import './DesignPallete.css'

const DesignPallete : React.FC = () => {

  const canvasContext: any = useContext(CanvasContext);

  const onBGClickHandler = (color: string) => {
    if(canvasContext.state.targetElement) {
      updateCanvasInfo(canvasContext.dispatch, {
        id: canvasContext.state.targetElement.id,
        style : {
          backgroundColor: color,
        }
      })
    }
  }

  const onTextClickHandler = (color: string) => {
    if(canvasContext.state.targetElement) {
      updateCanvasInfo(canvasContext.dispatch, {
        id: canvasContext.state.targetElement.id,
        style : {
          color,
        }
      })
    }
  }



  return (
    <aside className='pallete-container'>
      <div>
        <h3>Background Colors</h3>
        <hr />
        <div style={{display:'flex', gap:'3px'}}>
          <div id="red-bg" className="circle-color-block" onClick={() => onBGClickHandler('red')}></div>
          <div id="blue-bg" className="circle-color-block" onClick={() => onBGClickHandler('blue')}></div>
          <div id="green-bg" className="circle-color-block" onClick={() => onBGClickHandler('green')}></div>
          <div id="black-bg" className="circle-color-block" onClick={() => onBGClickHandler('black')}></div>
        </div>
      </div>
      <br />
      <div>
        <h3>Font Colors</h3>
        <hr />
        <div style={{display:'flex', gap:'3px'}}>
          <div id="red-bg" className="circle-color-block" onClick={() => onTextClickHandler('red')}></div>
          <div id="blue-bg" className="circle-color-block" onClick={() => onTextClickHandler('blue')}></div>
          <div id="green-bg" className="circle-color-block" onClick={() => onTextClickHandler('green')}></div>
          <div id="black-bg" className="circle-color-block" onClick={() => onTextClickHandler('black')}></div>
        </div>
      </div>
    </aside>
  )
}

export default DesignPallete