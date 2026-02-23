import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

/* ── Custom green marker icon (avoids default icon bundler issue) ── */
function createMarkerIcon(isActive = false) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: ${isActive ? '20px' : '14px'};
      height: ${isActive ? '20px' : '14px'};
      background: #00C853;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 ${isActive ? '12px' : '6px'} rgba(0,200,83,0.6);
      transition: all 0.3s ease;
    "></div>`,
    iconSize: isActive ? [20, 20] : [14, 14],
    iconAnchor: isActive ? [10, 10] : [7, 7],
    popupAnchor: [0, isActive ? -12 : -9],
  });
}

const defaultIcon = createMarkerIcon(false);
const activeIcon = createMarkerIcon(true);

/* ── Fly to active branch ── */
function FlyToActive({ branch }) {
  const map = useMap();
  const prevId = useRef(null);

  useEffect(() => {
    if (branch && branch.id !== prevId.current) {
      prevId.current = branch.id;
      map.flyTo([branch.lat, branch.lng], 14, { duration: 1.2 });
    }
  }, [branch, map]);

  return null;
}

/* ── Zimbabwe center & zoom for full country overview ── */
const ZIMBABWE_CENTER = [-19.0, 29.9];
const ZIMBABWE_ZOOM = 1;

export default function BranchMap({ branches, activeBranchId, onBranchClick }) {
  return (
    <MapContainer
      center={ZIMBABWE_CENTER}
      zoom={ZIMBABWE_ZOOM}
      minZoom={1}
      scrollWheelZoom={true}
      className="w-full h-full rounded-2xl z-0"
      style={{ minHeight: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[branch.lat, branch.lng]}
          icon={activeBranchId === branch.id ? activeIcon : defaultIcon}
          eventHandlers={{
            click: () => onBranchClick?.(branch.id),
          }}
        >
          <Popup>
            <div className="text-sm min-w-[180px]">
              <p className="font-bold text-gemak-green text-sm">{branch.name}</p>
              <p className="text-xs mt-1 opacity-80">{branch.address}</p>
              {branch.contactPerson && (
                <p className="text-xs mt-1 opacity-60">Contact: {branch.contactPerson}</p>
              )}
              {branch.phone && (
                <a href={`tel:${branch.phone}`} className="text-xs mt-1 block text-gemak-green font-medium">
                  {branch.phone}
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <FlyToActive branch={branches.find(b => b.id === activeBranchId)} />
    </MapContainer>
  );
}
