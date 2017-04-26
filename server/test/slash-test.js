var request = require('supertest');
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var beforeEach = mocha.beforeEach
var afterEach = mocha.afterEach

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('../src/server');
  });
  afterEach(function() {
    server.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
