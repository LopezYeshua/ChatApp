
const express = require('express')
const cors = require('cors')
const app = express()
const server = app.listen(8000, () => console.log("The server is all fired up on port 8000"))
const io = require('socket.io')(server, { cors: true })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./server/config/mongoose.config');
require('./server/routes/user.routes')(app);

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("message", ({username,message}) => {
        io.emit('message', {username, message})
    })
})