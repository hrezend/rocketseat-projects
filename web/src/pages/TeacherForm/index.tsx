import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

function TeacherForm(){
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="How amazing you want to teach"
                description="The first step is to fill out this registration form"
            ></PageHeader>

            <main>

                <fieldset>
                    <legend>About you</legend>
                    <Input name="name" label="Name"></Input>
                    <Input name="avatar" label="Avatar"></Input>
                    <Input name="whatsapp" label="WhatsApp"></Input>
                    <TextArea name="biografia" label="Bio"></TextArea>
                </fieldset>

                <fieldset>
                    <legend>About the class</legend>
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
                    <Input name="cost" label="Cost in hour/class"></Input>
                </fieldset>

                <fieldset>
                    <legend>
                        Available Times
                        <button type="button">+ Add Time</button>
                    </legend>
                    <div className="schedule-item">
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
                        <Input type="time" name="from" label="From"></Input>
                        <Input type="time" name="to" label="To"></Input>
                    </div>
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Important Warning"></img>
                        Important <br></br>
                        Fill all data
                    </p>
                    <button type="button">Submit</button>
                </footer>
            </main>
        </div>
    );
}

export default TeacherForm;