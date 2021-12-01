import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';
import '../styles/global.css';
import '../styles/screens/landing.css';

import LogoImg from '../images/logo.svg';

function Landing(){
    return(
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={LogoImg} alt="Happy"></img>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças</p>
                </main>

                <div className="location">
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </div>

                <Link to="/orphanages/list" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6"></FiArrowRight>
                </Link>
            </div>
        </div>
    );
}

export default Landing;