module.exports = function (env) {

    process.env.NODE_ENV = (env === 'dev') ? 'development' : 'production';

    require('dotenv').config({path: `./config/.env.${process.env.NODE_ENV}`});
    require('dotenv').config({path: './config/.env.default'});    

    return require(`./config/webpack.${env}.js`);

}