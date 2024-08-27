// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../server';  // Update this path to your server's entry point
// import Notes from '../models/notes.model';
// import User from '../models/user.model';
// import mongoose from 'mongoose';

// chai.should();
// chai.use(chaiHttp);

// let token; // To store the auth token
// let noteId; // To store a created note's ID

// describe('Notes API', () => {
//   before(async () => {
//     // Clear database and create a test user
//     await Notes.deleteMany({});
//     await User.deleteMany({});

//     const user = new User({
//       name: 'Test User',
//       email: 'testuser@example.com',
//       password: 'password123'
//     });
//     await user.save();

//     // Authenticate the test user and get a token
//     const res = await chai
//       .request(server)
//       .post('/api/v1/users/login')
//       .send({ email: 'testuser@example.com', password: 'password123' });

//     token = res.body.token;
//   });

//   // Test the CREATE NOTE route
//   describe('POST /api/v1/notes/createNote', () => {
//     it('should create a new note', (done) => {
//       const note = {
//         title: 'Test Note',
//         noteDetails: 'Details of the test note'
//       };
//       chai
//         .request(server)
//         .post('/api/v1/notes/createNote')
//         .set('Authorization', `Bearer ${token}`)
//         .send(note)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           res.body.data.should.have.property('title').eql('Test Note');
//           noteId = res.body.data._id; // Save the note ID for later tests
//           done();
//         });
//     });
//   });

//   // Test the GET ALL NOTES route
//   describe('GET /api/v1/notes/getAllNote', () => {
//     it('should get all notes', (done) => {
//       chai
//         .request(server)
//         .get('/api/v1/notes/getAllNote')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.data.should.be.a('array');
//           res.body.data.length.should.be.eql(1);
//           done();
//         });
//     });
//   });

//   // Test the UPDATE NOTE route
//   describe('PUT /api/v1/notes/updateNote/:id', () => {
//     it('should update a note by its ID', (done) => {
//       const updatedNote = {
//         title: 'Updated Test Note',
//         noteDetails: 'Updated details of the test note'
//       };
//       chai
//         .request(server)
//         .put(`/api/v1/notes/updateNote/${noteId}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send(updatedNote)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.data.should.have.property('title').eql('Updated Test Note');
//           done();
//         });
//     });
//   });

//   // Test the DELETE NOTE route
//   describe('DELETE /api/v1/notes/deleteNote/:id', () => {
//     it('should delete a note by its ID', (done) => {
//       chai
//         .request(server)
//         .delete(`/api/v1/notes/deleteNote/${noteId}`)
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });

//   // Test the GET ARCHIVED NOTES route
//   describe('GET /api/v1/notes/archive', () => {
//     it('should get all archived notes', (done) => {
//       chai
//         .request(server)
//         .get('/api/v1/notes/archive')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.data.should.be.a('array');
//           done();
//         });
//     });
//   });

//   // Test the GET TRASHED NOTES route
//   describe('GET /api/v1/notes/trash', () => {
//     it('should get all trashed notes', (done) => {
//       chai
//         .request(server)
//         .get('/api/v1/notes/trash')
//         .set('Authorization', `Bearer ${token}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.data.should.be.a('array');
//           done();
//         });
//     });
//   });

//   after(async () => {
//     // Clean up the database after tests
//     await Notes.deleteMany({});
//     await User.deleteMany({});
//     mongoose.connection.close(); // Close the connection after tests
//   });
// });