const jsonServer = require('json-server')
const express = require('express')
const path = require('path')

const reset = require('json-server-reset')
const setApp = require('json-server-reset/src/set-app')
const bodyParser = require('json-server/lib/server/body-parser')

const app = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('data/db.json')

const port = process.env.PORT || 3001

/**
 * Workaround to be able to use json-server-reset lib with
 * a custom route
 * @returns {any}
 */
function resetOnApiRoute () {
  arguments[0].url = arguments[0].url.replace('/api', '')
  return reset(...arguments)
}
app.use(setApp(app, router.db))
app.use(bodyParser)
app.use(resetOnApiRoute)

app.use('/api', middlewares, router)
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log(`Listening on ${port}`)
