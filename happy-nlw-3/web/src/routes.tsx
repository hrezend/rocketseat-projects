import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Landing from './screens/Landing';
import OrphanagesMap from './screens/OrphanagesMap';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/orphanages/map" exact component={OrphanagesMap}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;