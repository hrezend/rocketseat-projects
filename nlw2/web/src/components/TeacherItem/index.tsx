import React from 'react';

import api from '../../services/api';
import wppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

export interface Teacher{
    id: number;
    name: string;
    whatsapp: string;
    biografia: string;
    avatar: string;
    cost: number;
    subject: string;
}

interface TeacherProps{
    teacher: Teacher;
}

const TeacherItem:React.FC<TeacherProps> = ({teacher}) =>{

    function createNewConnection(){
        api.post('/connections',{
            teacher_id: teacher.id
        });
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}></img>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.biografia}
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>{teacher.cost}</strong>
                </p>
                <a target="_blank"
                    href={`https://wa.me/${teacher.whatsapp}`}
                    type="button"
                    onClick={createNewConnection}
                >
                    <img src={wppIcon} alt="WhatsApp"></img>
                    Send Message
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;