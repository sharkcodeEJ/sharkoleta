import React from 'react';
import { BrowserRouter,Switch , Route } from "react-router-dom";
import Cadastro from './cadastro/index';
import DadosColeta from './dadosColeta/index';
import Busca from './busca/index';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/register' exact component={Cadastro}/>
                <Route path='/' exact component={Busca}/>
                <Route path='/point' exact component={DadosColeta}/>
            </Switch>
        </BrowserRouter>
    );
}