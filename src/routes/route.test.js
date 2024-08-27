import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src'; // Adjust the path based on your project structure

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes', () => {
  it('should return a welcome message on the base route', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal('Welcome>>> Api is Working');
        done();
      });
  });

  it('should return 404 for non-existing routes', (done) => {
    chai.request(app)
      .get('/api/v1/non-existent-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Route not found');
        done();
      });
  });
});
