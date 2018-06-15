var webpack = require('webpack');
var config = require('./webpack.dev.config');

config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warning: false
        }
    })
]);


webpack(config, function (err) {
    if (err) {
        throw err;
    } else {
        console.log('build success');
    }
});