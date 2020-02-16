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
    favoriteActivities: [{ image: 'https://via.placeholder.com/150', id: '5' }],
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
describe('PUT /user /_id', () => {
  const userToUpdate = {
    name: 'Becca',
    image: 'https://media.giphy.com/media/tghHsahSrWTEk/giphy.gif',
    email: '1234@1234.com',
    age: '21',
    gender: 'Female',
    favoriteActivities: [{ image: 'https://via.placeholder.com/150', id: '5' }],
    favoriteCoding: [{ image: 'https://via.placeholder.com/150', id: '5' }],
    genderInterest: 'Male',
    password: '',
    passwordConfirm: ''
  };
  before(done => {
    api
      .put(`/users/${userToUpdate}/edit`)
      .set('Accept', 'application/json')
      .send(userToUpdate)
      .end(done);
  });
  it('should update a user by id', done => {
    api
      .get(`/users/${userToUpdate.id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.id).to.equal(userToUpdate.id);
        done();
      });
  });
});
describe('DELETE /users/_id', () => {
  let idToDelete = {
    name: 'Becca',
    image: 'https://media.giphy.com/media/tghHsahSrWTEk/giphy.gif',
    email: '1234@1234.com',
    age: '21',
    gender: 'Female',
    favoriteActivities: [{ image: 'https://via.placeholder.com/150', id: '5' }],
    favoriteCoding: [{ image: 'https://via.placeholder.com/150', id: '5' }],
    genderInterest: 'Male',
    password: '',
    passwordConfirm: ''
  };
  before(done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const users = response.body;
        idToDelete = users[users.length - 1].id;
      });
    done();
  });
  before(done => {
    api
      .delete(`/users/${idToDelete}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        done();
      });
  });
  it('should remove users from the string', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedUser = response.body.find(user => user.id === idToDelete);
        expect(deletedUser).to.equal(undefined);
      });
    done();
  });
});
