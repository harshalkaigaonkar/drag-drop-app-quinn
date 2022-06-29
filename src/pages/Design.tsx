import React from 'react'
import Canvas from '../components/Canvas/Canvas'
import DesignPallete from '../components/DesignPallete/DesignPallete'
import Shapes from '../components/Shapes/Shapes'

const Design : React.FC = () => {
  
  return (
    <div style={{"width":"100%", "height":"100vh", "display":"flex", "flexDirection":"row"}}>
     <Shapes />
     <Canvas />
     <DesignPallete />
    </div>
  )
}

export default Design