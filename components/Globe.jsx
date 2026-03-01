import Globe from 'react-globe.gl';
import { useEffect, useRef, useState } from 'react';
import { geoCentroid, geoArea } from 'd3-geo';

export default function MyGlobe({ onCoordsChange }) {
  const globeRef = useRef();

  const [hovered, setHovered] = useState(null);
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

        const worldWithoutBrazil = worldData.features.filter(
          feat => feat.properties.name !== 'Brazil'
        );

        const combined = [
          ...worldWithoutBrazil,
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

  useEffect(() => {
    if (!globeRef.current || typeof onCoordsChange !== 'function') return;

    const renderer = globeRef.current.renderer();
    if (!renderer) return;
    const canvas = globeRef.current.renderer().domElement;

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const coords = globeRef.current.getCoords(x, y);

      if (!coords) {
        onCoordsChange(null);
        return
      };

      onCoordsChange({
        lat: coords.y,
        lng: coords.x
      });
    };


    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onCoordsChange]);

  return (
    <Globe
      ref={globeRef}
      autoRotate={true}
      autoRotateSpeed={0.5}
      polygonsTransitionDuration={200}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onPolygonHover={setHovered}

      polygonCapColor={d => {
        if (d === hovered && d.properties.isBrazilState) {
          return 'rgba(255,215,0,0.9)'
        }

        if (d.properties.isBrazilState) {
          return 'rgba(255,215,0,0.4)'
        }

        return 'rgba(0,0,0,0)'
      }}

      polygonSideColor={() => 'rgba(0,0,0,0.05)'}

      polygonStrokeColor={d =>
        d.properties.isBrazilState ? '#ffffff' : '#555555'
      }

      polygonStrokeWidth={d =>
        d.properties.isBrazilState ? 1.2 : 0.3
      }

      polygonAltitude={d => {
        if (!hovered) return 0.01

        if (d === hovered && d.properties.isBrazilState) {
          return 0.03
        }

        if (d === hovered) {
          return 0.02
        }

        return 0.01
      }}

      onPolygonClick={d => {
        if (!d) return;

        const [lng, lat] = geoCentroid(d);
        const area = geoArea(d);

        const altitude = d.properties.isBrazilState
          ? 0.1 + Math.sqrt(area) * 2
          : 1.2 + Math.sqrt(area) * 2;

        globeRef.current.controls().autoRotate = false
        globeRef.current.pointOfView(
          {
            lat, lng, altitude
          },
          1500
        );

        if (!lat || !lng) return;
      }}
    />
  );
}