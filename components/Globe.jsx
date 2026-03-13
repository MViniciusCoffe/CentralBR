import Globe from "react-globe.gl";
import { useEffect, useRef, useState, useMemo } from "react";
import { geoCentroid, geoArea } from "d3-geo";
import * as THREE from "three";
import { feature } from "topojson-client";
import { useMap } from "../context/MapContext";

export default function MyGlobe({ onCoordsChange }) {
  const { mapLevel } = useMap();
  const globeRef = useRef();
  const [hovered, setHovered] = useState(null);
  const [worldFeatures, setWorldFeatures] = useState([]);
  const [brazilFeatures, setBrazilFeatures] = useState([]);
  const worldDataRef = useRef(null);
  let frame = null;

  const path =
    mapLevel === "regions"
      ? "/data/brazil_regions.json"
      : "/data/brazil_states.json";

  const polygons = useMemo(() => {
    return [...worldFeatures, ...brazilFeatures];
  }, [worldFeatures, brazilFeatures]);

  useEffect(() => {
    async function loadData() {
      try {
        if (!worldDataRef.current) {
          const worldRes = await fetch("/data/world.json");
          worldDataRef.current = await worldRes.json();
        }

        const brazilRes = await fetch(path);
        const brazilData = await brazilRes.json();

        const worldData = worldDataRef.current;

        let brazilFeatures;

        if (brazilData.type === "Topology") {
          const brazilGeo = feature(
            brazilData,
            brazilData.objects[Object.keys(brazilData.objects)[0]],
          );
          brazilFeatures = brazilGeo.features;
        } else {
          brazilFeatures = brazilData.features;
        }

        brazilFeatures = brazilFeatures.map((feat) => ({
          ...feat,
          properties: {
            ...feat.properties,
            isBrazilState: true,
            baseColor: "rgba(255,215,0,0.4)",
            hoverColor: "rgba(255,215,0,0.9)",
            strokeColor: "#ffffff",
            strokeWidth: 1.2,
            baseAltitude: 0.01,
            hoverAltitude: 0.03,
          },
        }));

        const worldWithoutBrazil = worldData.features
          .filter((feat) => feat.properties.name !== "Brazil")
          .map((feat) => ({
            ...feat,
            properties: {
              ...feat.properties,
              baseColor: "rgba(0,0,0,0)",
              hoverColor: "rgba(255,255,255,0.05)",
              strokeColor: "#555555",
              strokeWidth: 0.3,
              baseAltitude: 0.01,
              hoverAltitude: 0.02,
            },
          }));

        setWorldFeatures(worldWithoutBrazil);
        setBrazilFeatures(brazilFeatures);
      } catch (error) {
        console.error("Erro ao carregar os dados", error);
      }
    }

    loadData();
  }, [path]);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: -10, lng: -55, altitude: 2 }, 2000);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || typeof onCoordsChange !== "function") return;

    const renderer = globeRef.current.renderer();
    if (!renderer) return;

    const canvas = renderer.domElement;
    const camera = globeRef.current.camera();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const globeSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100);

    const intersectionPoint = new THREE.Vector3();

    const handleMouseMove = (event) => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = null;

        const rect = canvas.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.ray.intersectSphere(
          globeSphere,
          intersectionPoint,
        );

        if (!hit) {
          onCoordsChange(null);
          return;
        }

        const radius = globeSphere.radius;
        const lat = Math.asin(intersectionPoint.y / radius) * (180 / Math.PI);
        const lng =
          Math.atan2(intersectionPoint.x, intersectionPoint.z) *
          (180 / Math.PI);

        onCoordsChange({ lat, lng });
      });
    };

    const handleMouseLeave = () => {
      onCoordsChange(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onCoordsChange]);

  return (
    <Globe
      ref={globeRef}
      autoRotate={true}
      autoRotateSpeed={0.5}
      polygonsData={polygons}
      polygonsTransitionDuration={200}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onPolygonHover={setHovered}
      polygonCapColor={(d) =>
        d === hovered ? d.properties.hoverColor : d.properties.baseColor
      }
      polygonSideColor={() => "rgba(0,0,0,0.05)"}
      polygonStrokeColor={(d) => d.properties.strokeColor}
      polygonStrokeWidth={(d) => d.properties.strokeWidth}
      polygonAltitude={(d) =>
        d === hovered ? d.properties.hoverAltitude : d.properties.baseAltitude
      }
      onPolygonClick={(d) => {
        if (!d) return;

        const [lng, lat] = geoCentroid(d);
        const area = geoArea(d);

        const altitude = d.properties.isBrazilState
          ? 0.1 + Math.sqrt(area) * 2
          : 1.2 + Math.sqrt(area) * 2;

        globeRef.current.controls().autoRotate = false;
        globeRef.current.pointOfView(
          {
            lat,
            lng,
            altitude,
          },
          1500,
        );

        if (!lat || !lng) return;
      }}
    />
  );
}
