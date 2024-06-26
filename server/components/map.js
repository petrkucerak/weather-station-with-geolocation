import { MapConsumer, MapContainer, TileLayer } from "react-leaflet";
import { MAP_API_KEY } from "./utils";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import Stations from "./stations";
import { useState } from "react";

export default function Map() {
  const [accuracy, setAccuracy] = useState(0.001);
  return (
    <MapContainer
      center={[50.08, 14.45]}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-[75vh] sm:h-[90vh] rounded-xl"
    >
      <TileLayer
        url={`https://api.mapy.cz/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAP_API_KEY}`}
        attribution='<a href="https://api.mapy.cz/copyright" target="_blank" rel="noreferrer">&copy; Seznam.cz a.s. a další</a>'
      />
      <Stations accuracy={accuracy} />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
      <a
        href="http://mapy.cz/"
        target="_blank"
        rel="noreferrer"
        className="absolute z-[1000] bottom-0"
      >
        <img alt="Mapy.cz logo" src="https://api.mapy.cz/img/api/logo.svg" />
      </a>
      <div className="absolute z-[1000] top-5 right-2 w-24 h-12">
        <input
          className="input"
          type="number"
          value={accuracy}
          onChange={(e) => setAccuracy(e.target.value)}
        />
      </div>
    </MapContainer>
  );
}
