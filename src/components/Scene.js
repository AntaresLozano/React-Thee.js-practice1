import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
    const mountRef = useRef(null);

    useEffect(()=>{
        const currenMount = mountRef.current

        // SCENE
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            25,
            currenMount.clientWidth/ currenMount.clientHeight,
            0.1,
            1000
        )
        camera.position.setZ(4)
        scene.add(camera)

        // renderer
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currenMount.clientWidth, currenMount.clientHeight)
        currenMount.appendChild(renderer.domElement)

        //Controls
        const controls = new OrbitControls(camera,renderer.domElement)
        controls.enableDamping = true


        // Cube
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1,1,1),
            new THREE.MeshBasicMaterial()
        )
        scene.add(cube)

        // renderizar la escena
        const animate = () => {
            controls.update()
        renderer.render(scene,camera)
          requestAnimationFrame(animate)
        }
        animate()

        // cleanup scene
        return () =>{
            currenMount.removeChild(renderer.domElement)
        }

    },[])
    return (
        <div
            className='Contenedor3D'
            ref={mountRef}
            style={{width:'100%', height:'100vh'}}
        >
        </div>
    );
}

export default Scene;
