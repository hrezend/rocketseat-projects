import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

function TeacherForm(){
    //Método de redirecionamento
    const history = useHistory();

    //Funções que adicionam campos de horário na page de cadastro
    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''},
    ]);
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems, {week_day: 0, from: '', to: ''}
        ]);
    }
    function setScheduleItemValue(position: number, field: string, value: string){
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value};
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }

    //Funções que mandam os dados do form para a API
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [biografia, setBiografia] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    function handleSubmit(e: FormEvent){
        e.preventDefault();
        api.post('/study', {name, avatar, whatsapp, biografia, subject, cost: Number(cost), schedule: scheduleItems})
            .then(() => {
                alert('Okay');
                history.push('/');
            })
            .catch(() => {
                alert('An error was occurredy, try again');
            });
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="How amazing you want to teach"
                description="The first step is to fill out this registration form"
            ></PageHeader>

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>About you</legend>
                        <Input 
                            name="name" 
                            label="Name" 
                            value={name} 
                            onChange={(e) =>{setName(e.target.value)}}
                        ></Input>
                        <Input 
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        ></Input>
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsApp(e.target.value)}
                        ></Input>
                        <TextArea 
                            name="biografia" 
                            label="Bio"
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                        ></TextArea>
                    </fieldset>

                    <fieldset>
                        <legend>About the class</legend>
                        <Select
                            name="subject"
                            label="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Química', label: 'Química'},
                                {value: 'Filosofia', label: 'Filosofia'},
                                {value: 'Sociologia', label: 'Sociologia'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'História', label: 'História'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'Geometria', label: 'Geometria'},
                                {value: 'Inglês', label: 'Inglês'},
                                {value: 'Literatura', label: 'Literatura'},
                                {value: 'Redação', label: 'Redação'},
                                {value: 'Música e Instrumentos', label: 'Música e Instrumentos'},
                            ]}
                        ></Select>
                        <Input
                            name="cost"
                            label="Cost in hour/class"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        ></Input>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Available Times
                            <button type="button" onClick={addNewScheduleItem}>+ Add Time</button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Week Day"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda-feira'},
                                            {value: '2', label: 'Terça-feira'},
                                            {value: '3', label: 'Quarta-feira'},
                                            {value: '4', label: 'Quinta-feira'},
                                            {value: '5', label: 'Sexta-feira'},
                                            {value: '6', label: 'Sábado'},
                                        ]}
                                    ></Select>
                                    <Input 
                                        type="time" 
                                        name="from" 
                                        label="From"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    ></Input>
                                    <Input 
                                        type="time" 
                                        name="to" 
                                        label="To"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    ></Input>
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Important Warning"></img>
                            Important <br></br>
                            Fill all data
                        </p>
                        <button type="submit">Submit</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;