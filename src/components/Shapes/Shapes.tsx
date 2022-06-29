import React from 'react'
import './Shapes.css';

const Shapes: React.FC = () => {

  const dragStart = (event : any) => {
    console.log('drag Start')
    event.dataTransfer.setData('copy', event.target.id)
    event.dataTransfer.dropEffect = 'copy';
  }


  return (
    <div className="shapes-container">
      <h3>Shapes</h3>
      <hr />
      <div id="shapes">
        <div id="shapes-rectangle" draggable="true" onDragStart={dragStart}>Text</div>
      </div>
    </div>
  )
}

export default Shapes