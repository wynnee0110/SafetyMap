"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function UserLocation() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Center map
        map.setView([lat, lng], 15);

        // Blue dot marker
        const userIcon = new L.CircleMarker([lat, lng], {
          radius: 8,
          color: "#1976d2",
          fillColor: "#2196f3",
          fillOpacity: 1,

          
        });

        userIcon.addTo(map).bindPopup("You are here");
      },
      (err) => {
        console.warn("GPS denied", err.message);
      },
      { enableHighAccuracy: true }
      
    );
  }, [map]);

  return null;
}
