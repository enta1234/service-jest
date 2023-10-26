const request = require('supertest');
const app = require('../../index');

describe('GET users', () => {
  afterAll((done) => {
    app.close()
    done()
  })

  test('responds with a 200 status code', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
  });
});