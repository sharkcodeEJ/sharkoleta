import React from 'react';
import { BrowserRouter,Switch , Route } from "react-router-dom";
import Cadastro from './cadastro/index';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Cadastro}/>
                {/* <Route path='/login' exact component={}/>
                <Route path='/cadastro' exact component={}/> */}
            </Switch>
        </BrowserRouter>
    );
}