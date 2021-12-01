import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import CreateSuccess from './pages/Success';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact></Route>
            <Route component={CreatePoint} path="/create/point" exact></Route>
            <Route component={CreateSuccess} path="/create/success" exact></Route>
        </BrowserRouter>
    );
}

export default Routes;