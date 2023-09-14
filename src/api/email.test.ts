import request from 'supertest';
const message = require('./contact.email.test.json');

import app from '../app';

describe('POST /send/contact', () => {
  it('responds with a json message', (done) => {
    request(app)
      .post('/send/contact')
      .send(message)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.data = {
          'status': 'success',
          'data': {
            'message': 'Your message has been sent!'
          }
        }
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  })
});
