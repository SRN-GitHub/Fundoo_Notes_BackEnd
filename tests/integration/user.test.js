import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

describe('User API - Create User', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }

    // Ensure the connection is established before clearing collections
    await mongoose.connection.once('open', async () => {
      await mongoose.connection.db.dropDatabase(); // Drops the whole database instead of clearing individual collections
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should create a new user and return 201 status with success message', (done) => {
    const newUser = {
      FirstName: 'Sajan',
      LastName: 'Kumar',
      Email: 'sajankumar@gmail.com',
      Age: 30,
      Password: '12345678@sajan'
    };

    request(app)
      .post('/api/v1/users/createuser')
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.error('Response body:', res.body);
          console.error(`Error: expected 201 "Created", got ${res.statusCode} "${res.statusMessage}"`);
          return done(err);
        }
        expect(res.body).to.have.property('message').that.equals('User created successfully');
        console.log(res.body);
        done();
      });
  });
});
