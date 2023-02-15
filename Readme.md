# Pokedex API

This is a simple API for a Pokedex. It allows you to retrieve information about Pokemon and search for them using a separate "validate" endpoint.

## Installation

To use this API, clone the repository and run `npm install` to install the required dependencies.

## Endpoints

The following endpoints are available:

### GET /start/search

Starts a search for a random Pokemon every second. The results of each search are added to an array that can be retrieved with the `/stop/search` endpoint.

### GET /stop/search

Stops the search for random Pokemon and returns the results of each search as an array.

### GET /validate/pokemon

Searches for a random Pokemon in two JSON files: `pokemon.json` and `pokemon_list.json`. If a matching Pokemon is found in both files, returns the name of the Pokemon and any matching data.

### GET /:pokemon

Retrieves information about a specific Pokemon. The `:pokemon` parameter should be replaced with the name of the desired Pokemon.

### GET /notfound

Returns a 404 error message and logs the request.

### GET /notavailable

Returns a 502 error message and logs the request.
