import Leaflet from 'leaflet';
import logo2 from '../images/logo2.svg';

const MapIcon = Leaflet.icon({
    iconUrl: logo2,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

export default MapIcon;