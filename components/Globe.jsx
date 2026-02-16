import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Line } from '@react-three/drei'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import * as THREE from 'three';

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
  const [estados, setEstados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('/data/brazil-states.json')
      .then(res => res.json())
      .then(data => {
        setEstados(data.features);
        setCarregando(false);
      })
      .catch(err => console.error('Erro ao carregar GeoJSON:', err));
  }, []);

  if (carregando) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Carregando mapa...</div>;
  }

  const raio = 5; // Raio do globo

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Esfera base */}
      <Sphere args={[raio, 64, 64]}>
        <meshStandardMaterial color="#1a5f9e" wireframe={false} transparent opacity={0.2} />
      </Sphere>

      {/* Desenha as fronteiras */}
      {estados.map((estado, index) => {
        const geometria = estado.geometry;
        if (geometria.type === 'Polygon') {
          return desenharPoligono(geometria.coordinates, index, raio);
        } else if (geometria.type === 'MultiPolygon') {
          return geometria.coordinates.map((poly, i) =>
            desenharPoligono(poly, `${index}-${i}`, raio)
          );
        }
        return null;
      })}

      <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.5} />

      {/* Polo Norte (vermelho) */}
      <Sphere args={[0.2, 16, 16]} position={latLonToPosition(90, 0, raio)}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {/* Polo Sul (azul) */}
      <Sphere args={[0.2, 16, 16]} position={latLonToPosition(-90, 0, raio)}>
        <meshStandardMaterial color="blue" />
      </Sphere>

      {/* Brasília (verde) – para referência */}
      <Sphere args={[0.2, 16, 16]} position={latLonToPosition(-15.8, -47.9, raio)}>
        <meshStandardMaterial color="green" />
      </Sphere>
    </Canvas>
  );
}

function desenharPoligono(coordenadas, key, raio) {
  const anelExterior = coordenadas[0];
  const pontos = anelExterior.map(coord => {
    const [lon, lat] = coord;
    return latLonToPosition(lat, lon, raio);
  });
  pontos.push(pontos[0]); // Fecha o polígono

  return (
    <Line
      key={key}
      points={pontos}
      color="#ffffff"
      lineWidth={1}
    />
  );
}