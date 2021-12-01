import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

interface Item{
    id: number;
    title: string;
    image_url: string;
}
interface IBGEUf{
    sigla:string
}
interface IBGECity{
    nome: string;
}

const CreatePoint = () => {

    const history = useHistory();

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [city, setCity] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] =  useState('0');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [formData, setFormData] = useState({
        email: '',
        whatsapp: '',
        name: '',
    });

    //Pegar geolocalizacao do usuario para abrir o Mapa
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([
                latitude,
                longitude
            ]);
        })
    }, []);
    //Pegar os items de coleta da API Backend
    useEffect(() => {
        api.get('items').then(response =>{
            setItems(response.data);
        })
    }, []);
    //Pegando UF's da API do IBGE
    useEffect(() => {
        axios.get<IBGEUf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const initials = response.data.map(uf => uf.sigla);
            setUfs(initials);
        });
    }, []);
    //Pegando Cidades por UF's pela API do IBGE
    useEffect(() => {

        if(selectedUf === '0'){return;}

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNomes = response.data.map(city => city.nome);
            setCity(cityNomes);
        });

    }, [selectedUf]);

    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setSelectedUf(uf);
    }
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
    }
    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;
        setFormData({...formData, [name]: value});
    }
    function handleSelectedItem(id: number){
        const alreadySelected = selectedItens.findIndex(item => item === id);
        if(alreadySelected >= 0){
            const filteredItems = selectedItens.filter(item => item !== id);
            setSelectedItens(filteredItems);
        }
        else{
            setSelectedItens([...selectedItens, id]);
        }
    }
    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const {name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItens;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if(selectedFile){
            data.append('image', selectedFile);
        }

        await api.post('points', data);
        history.push('/create/success');
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"></img>
                <Link to="/">
                    <FiArrowLeft></FiArrowLeft>
                    Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do ponto de coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile}></Dropzone>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}></input>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}></input>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}></input>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker 
                        position={selectedPosition} 
                    />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUF}>
                                <option value="0">Selecionar UF</option>
                                {ufs.map(uf =>(
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecionar Cidade</option>
                                {city.map(city =>(
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item=> (
                            <li
                            className={selectedItens.includes(item.id) ? 'selected' : ''}
                            key={item.id} 
                            onClick={() => handleSelectedItem(item.id)}>
                                <img src={item.image_url} alt={item.title}></img>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar</button>
            </form>
        </div>    
    );
}

export default CreatePoint;