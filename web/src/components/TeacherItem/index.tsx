import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://hrezend.github.io/resume-web/img/profile.jpg" alt="hrezend"></img>
                <div>
                    <strong>Hérson Rezende</strong>
                    <span>Física</span>
                </div>
            </header>
            <p>
                O melhor professor.
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$80,00</strong>
                </p>
                <button type="button">
                    <img src={wppIcon} alt="WhatsApp"></img>
                    Send Message
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;