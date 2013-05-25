
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , hbs = require('hbs')
  , path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.engine('.html',require('hbs').__express); //use .html files in /views instead .hbs
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
        // res.locals.stylesheet = app.get('env') === 'development' ? 'styles.dev.css' : 'styles.css';
        // res.locals.google_analytics_id = process.env.GOOGLE_ANALYTICS_ID || undefined; 
        next();
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);
app.get("/:petition_id/signatures/:grouping", routes.signaturesBy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});