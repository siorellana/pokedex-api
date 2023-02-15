const request = require('supertest');
const app = require('./index');

describe('GET /:pokemon', () => {
  test('returns the requested pokemon', (done) => {
    const expectedPokemon = {
      name: 'Bulbasaur',
      id: 1,
      type: ['Grass', 'Poison'],
      base: {
        HP: 45,
        Attack: 49,
        Defense: 49,
        'Sp. Attack': 65,
        'Sp. Defense': 65,
        Speed: 45,
      },
    };

    request(app)
      .get('/bulbasaur')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expectedPokemon);
        done();
      });
  });

  test('returns a 404 error for an unknown pokemon', (done) => {
    request(app)
      .get('/unknown')
      .expect(404)
      .then((response) => {
        expect(response.text).toEqual('Pokemon not found: unknown');
        done();
      });
  });
});
