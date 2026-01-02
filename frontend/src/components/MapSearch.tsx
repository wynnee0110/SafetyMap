"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";

export default function MapSearch() {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore (leaflet-control-geocoder has no proper TS defs)
    const geocoder = L.Control.geocoder({
      position: "topright",
      placeholder: "Search location...",
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e: any) => {
        map.setView(e.geocode.center, 16);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
}
