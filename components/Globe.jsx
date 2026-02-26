import Globe from 'react-globe.gl';
import { useEffect, useRef, useState } from 'react';

export default function MyGlobe({ data }) {
  const globeRef = useRef();

  const [hovered, setHovered] = useState([]);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [worldRes, brazilRes] = await Promise.all([
          fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
          fetch('/data/brazil-states.json')
        ]);

        const worldData = await worldRes.json();
        const brazilData = await brazilRes.json();

        const brazilFeatures = brazilData.features.map(feat => ({
          ...feat,
          properties: {
            ...feat.properties,
            isBrazilState: true
          }
        }))

        const combined = [
          ...worldData.features,
          ...brazilFeatures
        ]

        setPolygons(combined)
      } catch (error) {
        console.error('Erro ao carregar os dados', error)
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: -10, lng: -55, altitude: 2 },
        2000
      );
    }
  }, [polygons]);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      polygonsData={polygons}

      polygonCapColor={d => {
        if (d === hovered) return 'rgba(255,255,0,0.7)';
        return d.properties.isBrazilState
          ? 'rgba(0,200,100,0.35)'
          : 'rgba(150,150,150,0.1)';
      }}

      polygonSideColor={() => 'rgba(0,0,0,0.05)'}

      polygonStrokeColor={d =>
        d.properties.isBrazilState ? '#ffffff' : '#555555'
      }

      polygonStrokeWidth={d =>
        d.properties.isBrazilState ? 1.2 : 0.3
      }

      polygonAltitude={d =>
        d === hovered ? 0.02 : 0.01
      }

      onPolygonHover={setHovered}

      onPolygonClick={d =>
        console.log('Estado clicado:', d.properties.name)
      }
    />
  );
}