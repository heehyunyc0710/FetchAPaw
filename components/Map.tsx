import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, Icon } from "leaflet";
import { useEffect } from "react";

// Fix for the broken marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
 
  const position: LatLngExpression = [latitude, longitude];


  useEffect(() => {
    // @ts-expect-error - fix for the broken marker icon
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
    });
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-[100%] h-[100%]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    <Marker 
        position={position} 
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup(); 
          },
          mouseout: (e) => {
            e.target.closePopup(); 
          }
        }}
      >
        <Popup>Pick me up here!</Popup>
      </Marker>
    </MapContainer>
  );
};
