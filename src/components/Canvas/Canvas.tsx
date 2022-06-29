import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasContext from '../../context/canvas/CanvasContext';
import {
  addCanvasInfo,
  updateCanvasInfo,
  setClientX,
  setClientY,
  setTargetElement,
} from '../../context/canvas/CanvasState'
import'./Canvas.css';

const Canvas : React.FC<{}>= () => {

  const canvasContext = useContext(CanvasContext);
  const navigate = useNavigate();
  const observer = useRef();

  const dragOver = (event : any) => {
    event.preventDefault();
    console.log('drag over')
  }
  const dragStart = (event : any) => {
    console.log('drag Start')
    event.dataTransfer.setData('same', event.target.id)
    event.dataTransfer.dropEffect = 'copy';
  }

  const onClickCanvas = () => {
    // setTargetElement(canvasContext.dispatch, null);
    console.log('canvas clicked')
  }

  const onChangeContent = (event: any) => {
    updateCanvasInfo(canvasContext.dispatch, {
      id: event.target.id,
      innerText: event.target.innerText
    })
  }

  const onShapeDropClick = (event: any) => {
    const TargetElement = document.getElementById(`${event.target.id}`);
    if(TargetElement && TargetElement.id.includes('canvas-class')) {
      setTargetElement(canvasContext.dispatch, TargetElement);
    }
  }

  const drop = (event: any) =>  {
    event.dataTransfer.dropEffect = 'copy';
    let ShapeDrop = event.dataTransfer.getData('copy');
    let ShapeDropNode: any;
    let id : string;
    const ParentNode: NodeListOf<Node>|undefined = document.getElementById('canvas')?.childNodes;
    if(ShapeDrop) {
      ShapeDropNode = document.getElementById(ShapeDrop)?.cloneNode(true);
      id = `canvas-class-${ParentNode && ParentNode.length + 1}`;
      console.log(ShapeDropNode.offsetWidth, ShapeDropNode.offsetHeight)
      const ShapeDropNodeObject = {
        id,
        className: "shape-on-canvas",
        draggable: "true",
        contentEditable: "true",
        ondragstart: dragStart,
        onclick: onShapeDropClick,
        innerText: "Text",
        style: {
          left: `${event.clientX}px`,
          top: `${event.clientY}px`,
          backgroundColor: 'white',
          color: 'black',
          padding: "10px",
          width: "40px",
          height: "28px"
        }
      }
      addCanvasInfo(canvasContext.dispatch, ShapeDropNodeObject);
    } else {
      ShapeDrop = event.dataTransfer.getData('same');
      ShapeDropNode = document.getElementById(ShapeDrop);
      id = ShapeDrop;
      const ShapeDropNodeObject = {
        id,
        style: {
          left: `${event.clientX}px`,
          top: `${event.clientY}px`
        }
      }
      updateCanvasInfo(canvasContext.dispatch, ShapeDropNodeObject);
    }
    event.preventDefault();
  }

  const onCreateCanvas = () => {
    navigate('canvas-output');
  }
  
  return (
    <main className='canvas-container' onClick={onClickCanvas}>
      <div id='canvas' onDrop={drop} onDragOver={dragOver}>
        {canvasContext.state?.canvasInfo.map((element: any, index: number) => (
          <div
            key={index}
            id={element.id}
            className={element.className}
            style={element.style}
            draggable={element.draggable}
            contentEditable={element.contentEditable}
            onInput={onChangeContent}
            onDragStart={dragStart}
            onClick={onShapeDropClick}
            suppressContentEditableWarning={true}
          >Text</div>
        ))}
      </div>
      <button className="create-canvas-button" onClick={onCreateCanvas}>Create Canvas</button>
    </main>
  )
}

export default Canvas