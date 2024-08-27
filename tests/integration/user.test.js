import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

let loginToken = '';  // Variable to store the login token
let newUser = {};   // Variable to store user details for login
let forgetToken = '';  // Variable to store reset token

describe('User API', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    await mongoose.connection.once('open', async () => {
      await mongoose.connection.db.dropDatabase();
    });

    newUser = {
      FirstName: 'Sajan',
      LastName: 'Kumar',
      Email: 'sajankumar@gmail.com',
      Age: 30,
      Password: '12345678@sajan',
    };
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe('Create User', () => {
    it('should create a new user and return 201 status with success message', (done) => {
      request(app)
        .post('/api/v1/users/createuser')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          console.log('Create User Response Status:', res.status);
          console.log('Create User Response Body:', res.body);

          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }
          expect(res.body).to.have.property('message').that.equals('User created successfully');
          done();
        });
    });
  });

  describe('Login User', () => {
    it('should log in the user created above and return 200 status with a token', (done) => {
      const loginDetails = {
        Email: newUser.Email,
        Password: newUser.Password,
      };

      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .expect(200)
        .end((err, res) => {
          console.log('Login Response Status:', res.status);
          console.log('Login Response Body:', res.body);

          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }

          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          
          // Store the token for future use
          loginToken = res.body.data.token;
          done();
        });
    });
  });

  describe('Forget Password', () => {
    it('should generate the reset token to reset the password', (done) => {
      const forgetDetails = {
        Email: newUser.Email
      };

      request(app)
        .post('/api/v1/users/forgot-password')
        .send(forgetDetails)
        .expect(200)
        .end((err, res) => {
          console.log('Forget Response Status:', res.status);
          console.log('Forget  Response Body:', res.body);

          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }      
          // Store the token for future use
          forgetToken = res.body.reset_token;
          done();
        });
    });
  });
});

console.log("Hello")
export { loginToken };