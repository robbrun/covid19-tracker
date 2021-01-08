import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";

// Pass countries in as prop to be able to loop through them for draw circles
function Map({ countries, center, zoom }) {
    return (
      <div className="map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        {/* Loop through and draw circles on the screen */}
        </LeafletMap>
      </div>
  );
}

export default Map;