"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MapSearch from "./MapSearch";


type MapProps = {
  apiUrl?: string;
};

export default function Map({ apiUrl }: MapProps) {
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
    </MapContainer>
  );
}
