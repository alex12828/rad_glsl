import * as THREE from 'three'
import GUI from 'lil-gui'

import vertexShader from './shaders/texturewarp/vertex.glsl'
import fragmentShader from './shaders/texturewarp/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// texture
const textureLoader = new THREE.TextureLoader()
const skellyTexture = textureLoader.load('/textures/skelly.png')

/**
 * Plane
 */
// Geometry
const planeGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)

// Material
const planeMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uScrollSpeed: { value: 10 },
        uSkellyTexture: { value: skellyTexture },
        uTime: { value: 0 },
        uColorPrimary: { value: new THREE.Color(0xFF0000).convertLinearToSRGB() },
        uColorSecondary: { value: new THREE.Color(0x00FFFF).convertLinearToSRGB() },
        uSineAmplitudePrimary: { value: 40 },
        uTimeScalePrimary: { value: 1.5 },
        uSineAmplitudeSecondary: { value: 40},
        uTimeScaleSecondary: { value: 1.5 }
    }
})

planeMaterial.colorSpace = THREE.SRGBColorSpace

/**
 * GUI
 */
gui.addColor(planeMaterial.uniforms.uColorPrimary, 'value').name('PrimaryColor')
gui.addColor(planeMaterial.uniforms.uColorSecondary, 'value').name('SecondaryColor')

const primaryFolder = gui.addFolder('Primary')
primaryFolder.add(planeMaterial.uniforms.uSineAmplitudePrimary, 'value').min(1).max(300).step(0.01).name('Amplitude')
primaryFolder.add(planeMaterial.uniforms.uTimeScalePrimary, 'value').min(0.1).max(60).step(0.001).name('TimeScale')

const secondaryFolder = gui.addFolder('Secondary')
secondaryFolder.add(planeMaterial.uniforms.uSineAmplitudeSecondary, 'value').min(1).max(300).step(0.01).name('Amplitude')
secondaryFolder.add(planeMaterial.uniforms.uTimeScaleSecondary, 'value').min(0.1).max(60).step(0.001).name('TimeScale')
// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 1.35)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    planeMaterial.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()