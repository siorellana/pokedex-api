const tracer = require('dd-trace').init();
const express = require('express');
const app = express();
const dogstatsd = require('dogstatsd-node');
const request = require('request');
const fs = require('fs');


// Create a middleware function to log every request
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    tracer.trace('http.request', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
    });
    next();
});

let intervalId;
let searchResults = [];

app.get('/start/search', (req, res) => {
    console.log('Starting pokemon interval');
    searchResults = [];
    intervalId = setInterval(() => {
        request('http://localhost:3000/validate/pokemon', (error, response, body) => {
            if (error) {
                console.error(error);
            }
            console.log(body);
            searchResults.push(body);
        });
    }, 1000);
    res.send('Pokemon search interval started');
    tracer.trace('http.response', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
    });
});

app.get('/stop/search', (req, res) => {
    console.log('Stopping pokemon interval');
    clearInterval(intervalId);
    res.send(searchResults);
    tracer.trace('http.response', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
    });
});


app.get('/validate/pokemon', (req, res) => {
    const pokemonListPath = './data/pokemon_list.json';
    const pokemonDataPath = './data/pokemon.json';
    fs.readFile(pokemonListPath, 'utf8', (error, pokemonListData) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving information');
        } else {
            const pokemonList = JSON.parse(pokemonListData);
            fs.readFile(pokemonDataPath, 'utf8', (error, pokemonData) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error retrieving information');
                } else {
                    const allPokemon = JSON.parse(pokemonData);
                    const randomIndex = Math.floor(Math.random() * pokemonList.length);
                    const randomPokemon = pokemonList[randomIndex];
                    const matchingPokemon = allPokemon.filter(p =>
                        p.name.english === randomPokemon.name && p.id === randomPokemon.id);
                    if (matchingPokemon.length > 0) {
                        console.log('We found it!');
                        res.send({
                            pokemon: randomPokemon.name,
                            matches: matchingPokemon,
                        });
                        tracer.trace('http.request', {
                            method: req.method,
                            url: req.url,
                            status_code: res.statusCode,
                        });
                    } else {
                        console.log(`Pokemon ${randomPokemon.name} not found`);
                        res.status(523).send(`Pokemon ${randomPokemon.name} not found`);
                        tracer.trace('http.request', {
                            method: req.method,
                            url: req.url,
                            status_code: res.statusCode,
                        });
                    }
                }
            });
        }
    });
});



// Define a route for /pokemon
app.get('/:pokemon', (req, res) => {
    const pokemonName = req.params.pokemon.toLowerCase();
    fs.readFile('./data/pokemon.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving information');
            tracer.trace('http.response', {
                method: req.method,
                url: req.url,
                status_code: res.statusCode,
            });
        } else {
            const pokemonList = JSON.parse(data);
            const pokemon = pokemonList.find(p => p.name.english.toLowerCase() === pokemonName);
            if (pokemon) {
                res.send(pokemon);
                tracer.trace('http.response', {
                    method: req.method,
                    url: req.url,
                    status_code: res.statusCode,
                });
            } else {
                const errorMessage = `Pokemon not found: ${pokemonName}`;
                console.error(errorMessage);
                res.status(523).send(errorMessage);
                tracer.trace('http.response', {
                    method: req.method,
                    url: req.url,
                    status_code: res.statusCode,
                });
            }
        }
    });
});

// Define a route for /notfound to respond with 404 and log the request
app.get('/notfound', (req, res) => {
    console.log('404 Pokedex Not Found Path');
    res.status(404).send('404 Pokedex Not Found Path');
    tracer.trace('http.response', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
    });
});

// Define a route for /notavailable to respond with 502 and log the request
app.get('/notavailable', (req, res) => {
    console.log('502 Pokedex Not Available Path');
    res.status(502).send('502 Pokedex Not Available Path');
    tracer.trace('http.response', {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
