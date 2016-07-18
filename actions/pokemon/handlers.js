'use strict'

let co = require('co')
let Pokedex = require('pokedex-promise-v2')
let pokedex = new Pokedex()

let getPokemonTypeString = pokemon => pokemon.types.map(type => type.type.name).join(' and ')

exports.identify = co.wrap(function * (request, params) {
  let response = request.response()
  response.endSession(true)

  try {
    let pokemon = yield pokedex.getPokemonByName(request.intent.PokemonName)

    response.speech(`
      <speak>
        <p>${pokemon.name} is pokemon number ${pokemon.id}</p>
        <p>${pokemon.name} weighs ${pokemon.weight} pound, is ${pokemon.height} inches tall, and is a ${getPokemonTypeString(pokemon)} type pokemon.</p>
      </speak>
    `)
  } catch (err) {
    response.speech('Sorry, we cannot identify that pokemon. Please try again.')
  }

  return response
})
