import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';
import './styles.css';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    //Função de Busca
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('/study', {
            params: {subject,week_day,time}
        })
        setTeachers(response.data);
    }


    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the available proffys">
                <form onSubmit={searchTeachers} id="search-teachers">
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
                    <Select
                        name="week_day"
                        label="Week Day"
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
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
                        name="Time" 
                        label="Hour"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></Input>
                    <button type="submit">Search</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    );
}

export default TeacherList;