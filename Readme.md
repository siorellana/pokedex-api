# Pokedex API <img align="right" src="https://github.com/siorellana/pokedex-api/blob/master/data/images/pokedex-icon.png">

[![CI/CD](https://github.com/siorellana/pokedex-api/actions/workflows/pipeline.yml/badge.svg?branch=master)](https://github.com/siorellana/pokedex-api/actions/workflows/pipeline.yml)
[![Docker Hub](https://img.shields.io/docker/pulls/siorellana/pokedex-api)](https://hub.docker.com/r/siorellana/pokedex-api)

This repository contains a RESTful API for a Pokedex that allows users to search for information about different Pokemon. The API is built using Node.js and Express, and data about the Pokemon is stored in JSON files.

## Endpoints

The API has the following endpoints:

- `GET /:pokemon`: returns information about the specified Pokemon.
- `GET /start/search`: starts an interval that searches for a random Pokemon every second.
- `GET /stop/search`: stops the interval started by `/start/search`.
- `GET /validate/pokemon`: returns information about a random Pokemon if it is present in a pre-defined list.
- `GET /notfound`: returns a 404 error.
- `GET /notavailable`: returns a 502 error.

## Usage

To use the API, you need to have Node.js and npm installed.

1. Clone the repository:

```sh
$ git clone https://github.com/siorellana/pokedex-api.git
```

2. Install the dependencies:
```sh
$ cd pokedex-api
$ npm install
```
3. Start the server

```sh
$ npm start
```
The server should be listening at http://localhost:3000.

## Tests
This repository includes some basic tests. To run them, you need to have jest and supertest installed.

1. Install the development dependencies:

```sh
$ npm install --only=dev
```

2. Run the tests:
```sh
$ npm test
```

## Docker
This API is also available as a Docker image. To run it in a container, you need to have Docker installed.

1. Pull the image from Docker Hub:
```sh
$ docker pull siorellana/pokedex-api
```

2. Run a container with the image:
```sh
$ docker run -p 3000:3000 siorellana/pokedex-api
```

## License
This project is licensed under the MIT License.
