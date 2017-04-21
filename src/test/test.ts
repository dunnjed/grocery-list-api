const request = require('supertest');
const app = require('../server');
var mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

describe('GET /grocery-items', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/grocery-items')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
});