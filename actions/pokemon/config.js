'use strict'

let handlers = require('./handlers')

module.exports = alexa => {
  alexa.action('pokemon-identify', {
    handler: handlers.identify,
    auto: {
      type: 'intent',
      intent: 'PokemonIdentify'
    }
  })
}
