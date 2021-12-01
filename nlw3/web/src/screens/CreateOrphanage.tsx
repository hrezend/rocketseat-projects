import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {FiPlus} from "react-icons/fi";
import {LeafletMouseEvent} from 'leaflet';

import '../styles/screens/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import MapIcon from '../utils/MapIcon';
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

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

  const [position, setPosition] = useState({latitude:0, longitude:0});
  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;
    setPosition({latitude: lat, longitude: lng});
  }

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const {longitude, latitude} = position;
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('/orphanages/add', data);
    alert('Cadastro realizado');
    history.push('/orphanages/list');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar></Sidebar>
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={initialPosition} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (<Marker interactive={false} icon={MapIcon} position={[position.latitude, position.longitude]}/>) }
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={name}></img>
                  );
                })}
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple id="image[]" type="file" onChange={handleSelectImages}/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
