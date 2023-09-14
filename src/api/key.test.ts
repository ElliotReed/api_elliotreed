import request from 'supertest';

import app from '../app';

const weatherKey = process.env.OPEN_WEATHER_KEY!

describe('GET /key/weatherton', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/key/weatherton')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { key: weatherKey }, done);
  });
});

