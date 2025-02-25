
'use client'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React,{Suspense} from 'react'
// import { AmbientLight, Vector3 } from 'three'
import Lights from './Lights'
import * as THREE from 'three'
import Loader from './Loader'
import IPhone from './IPHONE'
import { Canvas } from '@react-three/fiber'

const ModelView = ({index,groupRef,gsapType,controlRef,setRotation,item,size}) => {
  return (
    <Canvas
    index={index}
    group={groupRef}
    gsapType={gsapType}
    className={`size-full absolute ${index==2? 'right-[-100%]':''}`}
    >
      <ambientLight intensity={10} />
      <PerspectiveCamera makeDefault position={[0,0,4]} />
      
      <Lights/>

      <OrbitControls
      makeDefault
      ref={controlRef}
      enableZoom={false}
      enablePan={false}
      rotateSpeed={0.4}
      target={new THREE.Vector3(0, 0, 0)}
      
      onEnd={()=>setRotation(controlRef.current.getAzimuthalAngle())}
      />

<group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>


    </Canvas>
  )
}

export default ModelView