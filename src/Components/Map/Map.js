import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "../utility/util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
        {/* <Marker position={center}></Marker> */}
      </LeafletMap>
    </div>
  );
}

export default Map;
