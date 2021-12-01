import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

const Success = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/'), 2000);
  }, []);

  return(
    <div id="page-success">
      <span>
        <FiCheckCircle />
      </span>
      <h1>Success!</h1>
    </div>
  )
}

export default Success;