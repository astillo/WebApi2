const { server } = require('./server.js')
const port = 5000;

server.listen(port, () => {
    console.log('API on Port 5000')
})