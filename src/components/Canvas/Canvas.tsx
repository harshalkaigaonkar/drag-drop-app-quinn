import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasContext from '../../context/canvas/CanvasContext';
import {
  addCanvasInfo,
  updateCanvasInfo,
  setTargetElement,
} from '../../context/canvas/CanvasState'
import'./Canvas.css';

const Canvas : React.FC<{}>= () => {

  const canvasContext = useContext(CanvasContext);
  const navigate = useNavigate();
  const [manipulatingSize, setManipulatingSize] = useState<boolean>(false);
  const [continueManipulatingSize, setContinueManipulatingSize] = useState<boolean>(false);

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
    // let ShapeDropNode: (Node|null|HTMLElement|undefined) = null;
    let id : string|null = null;
    const ParentNode: NodeListOf<Node>|undefined = document.getElementById('canvas')?.childNodes;
    if(ShapeDrop) {
      // ShapeDropNode = document.getElementById(ShapeDrop)?.cloneNode(true);
      id = `canvas-class-${ParentNode && ParentNode.length + 1}`;
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
      // ShapeDropNode = document.getElementById(ShapeDrop);
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

  const onMouseDownHandler = (event : any) => {
    setManipulatingSize(!manipulatingSize);
  }

  const onMouseMoveHandler = (event: any) => {
    if(manipulatingSize) {
      setContinueManipulatingSize(!continueManipulatingSize);
    }
  }

  const onMouseUpHandler = (event: any) => {
    if(manipulatingSize && continueManipulatingSize) {
      setManipulatingSize(!manipulatingSize);
      setContinueManipulatingSize(!continueManipulatingSize);
      updateCanvasInfo(canvasContext.dispatch, {
        id: event.target.id,
        style: {
          width: `${event.clientX - parseInt(event.target.style.left.split("px")[0], 10)}px`,
          height: `${event.clientY - parseInt(event.target.style.top.split("px")[0], 10)}px`,
        }
      })
    }
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
            onMouseDown={onMouseDownHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseUpHandler}
            data-text={`${element.innerText}`}
          ></div>
        ))}
      </div>
      <button className="create-canvas-button" onClick={onCreateCanvas}>Create Canvas</button>
    </main>
  )
}

export default Canvas