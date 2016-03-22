'use strict'

import Cycle from '@cycle/core';
import {li, div, label, ul, h1, input, button, makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Rx from 'rx';
//import makeHandshakeDriver from './handshake.js';

function main(sources) {
    let a = 0;
    const search$ = sources.DOM.select('.run').events('click')
        .map(() => {
            return {
                url: 'https://api.github.com/users',
                method: 'GET'
            };
        });
    const user$ = sources.HTTP
        .mergeAll()
        .map(response => response.body)
        .startWith([]);

    const divs$ = user$.map(users => 
        div(null, [
            button('.run', 'Run'),
            ul({className: 'user-list'}, users.map(user =>
                li('.user-details', [
                    div({className: 'user-login'}, user.login),
                    div({className: 'user-id'}, user.id)
                ]))
            )
        ])
    );

    return {
        DOM: divs$,
        HTTP: search$
    };
}

const sources = {
    DOM: makeDOMDriver('#app'),
    HTTP: makeHTTPDriver()
};

Cycle.run(main, sources);

module.exports = main;