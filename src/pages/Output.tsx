import React, { useContext } from 'react'
import CanvasContext from '../context/canvas/CanvasContext'
import '../components/Canvas/Canvas.css'

const Output : React.FC = () => {

  const canvasContext = useContext(CanvasContext);

  return (
    <div className="output-container">
      <div className='canvas'>
        {canvasContext.state.canvasInfo.map((element: any, index: number) => (
          <div
          key={index}
          id={element.id}
          className={element.className}
          style={element.style}
          draggable={element.draggable}
          contentEditable={element.contentEditable}
          suppressContentEditableWarning={true}
          >{element.innerText}</div>
        ))}
      </div>
    </div>
  )
}

export default Output