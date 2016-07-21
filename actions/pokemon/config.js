'use strict'

let handlers = require('./handlers')

module.exports = alexa => {
  alexa.action('pokemon-identify', {
    handler: handlers.identify,
    global: {
      type: 'intent',
      intent: 'PokemonIdentify'
    }
  })
}
