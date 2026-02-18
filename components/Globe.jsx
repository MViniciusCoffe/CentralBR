import { Canvas } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sphere, Line } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';

// Função para converter coordenadas geográficas (lon, lat) para posição 3D
function latLonToPosition(lat, lon, radius) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lon * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuração da cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510);

    // Câmera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-1000, -300, 750);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 100;
    controls.maxDistance = 300;

    Promise.all([
      fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(res => res.json()),
      fetch('/data/brazil-states.json').then(res => res.json()) // ajuste o caminho se necessário
    ])
      .then(([worldData, brazilData]) => {
        // 3. Marcar as features do Brasil com uma propriedade especial
        const brazilFeatures = brazilData.features.map(feat => ({
          ...feat,
          properties: {
            ...feat.properties,
            isBrazilState: true // identificador para estilização
          }
        }));

        const combinedFeatures = [...worldData.features, ...brazilFeatures];
        const combinedData = {
          type: 'FeatureCollection',
          features: combinedFeatures
        };

        const globe = new ThreeGlobe()
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // textura da Terra
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')    // relevo (opcional)
          // Se for estado brasileiro, verde semi-transparente; senão, cinza claro
          .showAtmosphere(true)
          .atmosphereColor('lightskyblue')
          .polygonsData(combinedData.features)
          .polygonCapColor(feat => {
            return feat.properties.isBrazilState
              ? 'rgba(0, 200, 100, 0.3)'  // verde para o Brasil
              : 'rgba(150, 150, 150, 0.1)'; // cinza quase transparente para outros países
          })

          .polygonSideColor(() => 'rgba(100, 100, 100, 0.05)')
          .polygonStrokeColor(feat => {
            // Bordas: branca para o Brasil, cinza para o resto
            return feat.properties.isBrazilState
              ? '#ffffff'  // borda branca para destacar
              : '#555555'; // borda escura para outros
          })
          .polygonAltitude(0.01); // pequena elevação para evitar artefatos

        scene.add(globe);
      })
      .catch(err => console.error('Erro ao carregar dados:', err));

    // Ajuste de tamanho quando a janela for redimensionada
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Loop de animação
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpeza ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '600px' }} />;
}