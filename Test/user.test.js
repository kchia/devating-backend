const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');

const api = supertest('http://localhost:7000');

describe('POST /signup', () => {
    const newUser = {
      name: 'Becca',
      image: 'https://media.giphy.com/media/tghHsahSrWTEk/giphy.gif',
      email: '1234@1234.com',
      age: '21',
      gender: 'Female',
      favoriteActivities: [
        { image: 'https://via.placeholder.com/150', id: '5' }
      ],
      favoriteCoding: [{ image: 'https://via.placeholder.com/150', id: '5' }],
      genderInterest: 'Male',
      password: '1234',
      passwordConfirm: '1234'
    };

    before(done => {
        api
        .post('/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .end(done);
    });

    it('should create a new user and add to users array', done => {
        api
        .get('/signup')
        .set('Accept', 'application/json')
        .end((error, response) => {
            const userToFind = response.body.find(
                user => user[0].email === newUser.email
            );
            expect(userToFind).to.be.an('object');
        });
        done();
    });
});
