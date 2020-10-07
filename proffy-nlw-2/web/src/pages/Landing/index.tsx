import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import gvcIcon from '../../assets/images/icons/give-classes.svg';
import phIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/api';

function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('/connections').then(response =>{
            const total = response.data.total;
            setTotalConnections(total);
        });
    }, []);

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"></img>
                    <h2>Your online study platform.</h2>
                </div>
                <img src={landImg} alt="Plataforma de estudos" className="hero-image"></img>
                
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Study"></img>
                        Studie
                    </Link>
                    <Link to="/teach" className="give-classes">
                        <img src={gvcIcon} alt="Teach"></img>
                        Teach
                    </Link>
                </div>

                <span className="total-connections">
                    Total of {totalConnections} connections made
                    <img src={phIcon} alt="Purple Heart"></img>
                </span>

            </div>
        </div>
    );
}

export default Landing;