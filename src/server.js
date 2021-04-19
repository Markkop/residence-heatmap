const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3031
console.log(process.env.PORT)

server.use(middlewares)
server.use(router)

server.listen(port)
