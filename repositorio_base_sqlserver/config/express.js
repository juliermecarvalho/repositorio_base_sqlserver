


module.exports = function() {

    var express = require('express');
    var app = express();
    var ejs = require('ejs');
    var load = require('express-load');
    var bodyParser = require('body-parser');
    var methodOoverride = require('method-override')();
    var expressLayouts = require('express-ejs-layouts');
    //var error = require('./../middleware/error'),
    

    app.set('views', './views');
    app.set('layout', 'layout'); // defaults to 'layout'     
    app.set("layout extractScripts", true);
    app.use(expressLayouts);


    //app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOoverride);

    app.use(express.static('./public'));
    //app.use(error.notFound);
    //app.use(error.serverError);

    load('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}