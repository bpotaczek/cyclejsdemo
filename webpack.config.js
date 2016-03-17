module.exports = {
    context: __dirname + '/src',
    entry: './main.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: '/node_modules/'
        },{
            test: /\.html$/,
            loader: 'raw'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};