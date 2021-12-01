import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Redirect = () => {
    return(
        <div id="page-redirect">
            <strong>Success</strong>
            <span>Congratulations, you are now a Proffy!</span>
            <Link className="page-success-button" to="/">Continue</Link>
        </div>
    );
}

export default Redirect;