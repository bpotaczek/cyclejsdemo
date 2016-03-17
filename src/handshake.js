import {ReplaySubject} from 'rx';

function makeHandshakeDriver(options) {
    console.log('makeHandshakeDriver: loaded');
    const {greeting, name} = options;

    const handshakeDriver = (source$) => {
        const sink$ = new ReplaySubject(1);

        let handBrake = 0;

        source$.subscribe((data) => {
            const message = `$(greeting), $(data) $(name)`;

            console.log('message: ' + message);

            if (data !== `you've created your first application using` && handBrake < 100) {
                sink$.onNext(message);
            }
            handBrake += 1;

        });
        return sink$;
    };

    return handshakeDriver;

}

module.exports = makeHandshakeDriver;