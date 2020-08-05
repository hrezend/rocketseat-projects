import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/study" exact component={TeacherList}></Route>
            <Route path="/teach" exact component={TeacherForm}></Route>
        </BrowserRouter>
    );
}

export default Routes;