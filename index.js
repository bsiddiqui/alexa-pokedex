'use strict'

// Override default promises
global.Promise = require('bluebird')

let Hapi = require('hapi')
let Alexa = require('alexa-router')
let glob = require('glob')

let alexa = new Alexa.Router()
let server = new Hapi.Server({
  debug: {
    request: ['error', 'validation']
  }
})

// Load all Alexa actions
glob.sync('./actions/**/config.js').forEach(file => {
  require(file)(alexa)
})

// Setup the listening interface
server.connection({ port: process.env.PORT || 8080 })

// Register plugins
server.register([
  {
    register: require('hapi-alexa-router'),
    options: {
      path: '/v1/alexa/incoming',
      alexa
    }
  }
], err => {
  if (err) throw err

  // Start the server after loading all the plugins
  server.start(err => {
    if (err) throw err
    console.log(`Server started at: ${server.info.uri}`)
  })
})
