import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import '../styles/global.css';
import '../styles/screens/orphanages-map.css';
import 'leaflet/dist/leaflet.css';
import logo2 from '../images/logo2.svg';
import MapIcon from '../utils/MapIcon';
import api from '../services/api';

interface Orphanage{
    id: number;
    name: string;
    longitude: number;
    latitude: number;
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanages/list').then(response => {
             setOrphanages(response.data);
        });
    }, []);

    //Pegar geolocalizacao do usuario para abrir o Mapa
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([
                latitude,
                longitude
            ]);
        })
    }, []);

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

            <Map center={initialPosition} zoom={15} style={{width: '100%', height: '100%'}}>
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
                
                {orphanages.map(orphanage => {
                    return(
                        <Marker icon={MapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/list/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFFFFF"></FiArrowRight>
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/add" className="create-orphanage">
                <FiPlus size={32} color="#FFFFFF"></FiPlus>
            </Link>
        </div>
    );
}

export default OrphanagesMap;