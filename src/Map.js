import React from 'react';
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import {showDataOnMap} from "./util";

function Map({countries,casesType,center,zoom}) {
    return (
        <div className='map'>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* loop country & draw circles */}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
            
        </div>
    )
}

export default Map
