const jsonServer = require('json-server')
const express = require('express')
const path = require('path')

const app = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('data/db.json')

const port = process.env.PORT || 3001

app.use('/api', middlewares, router)
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log(`Listening on ${port}`)
