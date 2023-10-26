const request = require('supertest');
const app = require('../../index');

describe('GET /', () => {
  afterAll(async (done) => {
    await app.close();
    done()
  });

  it('responds with a 200 status code', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
  });
});