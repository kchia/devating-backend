const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:7000/match');

describe('GET /', () => {
    it('should return a 200 response', done => {
        api.get('/').set('Accept', 'application/json').expect(200, done);
    });

    it('should return an array of all users', done => {
        api.get('/').set('Accept', 'application/json').end((error, response) => {
            expect(response.body).to.be.an('array');
            done();
        });
    });
})