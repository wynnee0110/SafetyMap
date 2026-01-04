"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MapSearch from "./MapSearch";
import L from "leaflet";
import UserLocation from "./UserLocation";




// Fix for default marker icon not showing in Leaflet
L.

Marker.prototype.options.icon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});


type Incident = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  severity: number;
};

type MapProps = {
  apiUrl: string;
};

export default function Map({ apiUrl }: MapProps) {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/incidents`)
      .then((res) => res.json())
      .then((data) => {
        console.log("INCIDENTS:", data);
        setIncidents(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, [apiUrl]);

  return (
    <MapContainer
      center={[14.5995, 120.9842]}
      zoom={13}
      className="h-screen w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <MapSearch />
      <UserLocation />

      {incidents.map((i) => (
        <Marker key={i.id} position={[i.latitude, i.longitude]}>
          <Popup>
            <b>{i.title}</b>
            <br />
            Severity: {i.severity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
