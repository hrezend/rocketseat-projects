import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Landing from './screens/Landing';
import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageCreate from './screens/CreateOrphanage';
import OrphanageList from './screens/Orphanage';;


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/orphanages/list" exact component={OrphanagesMap}></Route>
                <Route path="/orphanages/add" exact component={OrphanageCreate}></Route>
                <Route path="/orphanages/list/:id" exact component={OrphanageList}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;