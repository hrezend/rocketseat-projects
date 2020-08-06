import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList(){
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the available proffys">
                <form id="search-teachers">
                    <Select
                        name="subject"
                        label="Subject"
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
                    <Input type="time" name="Time" label="Hour"></Input>
                </form>
            </PageHeader>

            <main>
                <TeacherItem></TeacherItem>
            </main>
        </div>
    );
}

export default TeacherList;