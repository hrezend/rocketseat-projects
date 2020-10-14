import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import '../styles/global.css';
import '../styles/screens/orphanages-map.css';
import 'leaflet/dist/leaflet.css';
import logo2 from '../images/logo2.svg';
import MapIcon from '../utils/MapIcon';

function OrphanagesMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={logo2} alt="Happy"></img>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            <Map center={[-27.20923, -49.64013]} zoom={15} style={{width: '100%', height: '100%'}}>
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
                <Marker icon={MapIcon} position={[-27.28928, -49.640189]}>
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        Lar das meninas
                        <Link to="/orphanages/list/1">
                            <FiArrowRight size={20} color="#FFFFFF"></FiArrowRight>
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="/orphanages/add" className="create-orphanage">
                <FiPlus size={32} color="#FFFFFF"></FiPlus>
            </Link>
        </div>
    );
}

export default OrphanagesMap;