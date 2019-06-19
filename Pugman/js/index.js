const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('session');
var fs = require('fs');

app.use(bodyParser.json());
var port = 8080;

var users = [
	{username: 'pug', password:'123'},
 	{username: 'admin', password:'admin'}
];
//var sessionHandler = require('session_handler');
//var store = sessionHandler.createStore();

//app.use(cookieParser());
//app.use(session({
	//store: store,
	//resave: false,
	//saveUnitialized: true,
	//secret:'secret'
//}));

app.get('/', function (req,res) {
	res.sendFile(path.join(__dirname, 'registration.html'));
});
app.post('/login', function (req,res){
	var foundUser;
	for(var i = 0; i<users.length; i++) {
		var u = users[i];
		if(u.username == req.body.username && u.password == req.body.password){
			foundUser=u.username;
			break;
		}
	}
	if(foundUser!==undefined) {
		console.log('Login succeeded: ', foundUser);
		res.send('Login successful! User: '+foundUser)
	} else {
		console.log('Login failed: ' + req.body.username)
		res.status(401).send('Login error');
	}
});

app.get('/user', function(req,res){
		res.sendFile(path.join(__dirname, 'user_page'));
});


app.listen(port, function(){
	console.log('app is listening on port ' + port);
});

