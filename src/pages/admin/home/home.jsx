import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const AdminHome = () => {

  const { i18n } = useTranslation();
  if (i18n.language == "ru-RU") {
    i18n.changeLanguage("ru");
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div className="container">
      {/* <div className="map"> */}
      <MapContainer
        center={[41.381166, 64.5735819]}
        zoom={6}
        // minZoom={0}
        // maxZoom={100}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[41.381166, 64.5735819]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[41.381166, 44.5735819]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <LocationMarker />
      </MapContainer>
      {/* </div> */}
    </div>
  );
};

export default AdminHome;
