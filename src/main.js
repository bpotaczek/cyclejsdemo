'use strict'

import Cycle from '@cycle/core';
import makeHandshakeDriver from './handshake.js';

function main(sources) {
    console.log(sources);
    const {Handshake} = sources;

    console.log(Handshake);
    const message$ = Handshake
        .startWith('world from')
        .map(message => {
            console.log(message);
            return message;
        }) ;

    const sinks = {
        Handshake: message$
    };

    return sinks;
}

const handshakeDriverOptions = {
    greeting: 'Hello',
    name: 'Brady'
};

const sources = {
    Handshake: makeHandshakeDriver(handshakeDriverOptions)
};

Cycle.run(main, sources);

module.exports = main;