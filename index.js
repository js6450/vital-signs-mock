const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/broadcast', (req, res) => {
    res.render('broadcast');
});

io.on('connection', (socket) => {
    console.log(`a user connected with id ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('disconnect', socket.id);
    });

    let dataReceived = [];

    socket.on('data', (data) => {
        //dataReceived.push(data);
      //  console.log(dataReceived.length);
        io.emit('broadcast', {id: socket.id, data: data});
    });
});

http.listen(port, () => {
    console.log(`listening on ${port}`);
});