const index = require('../index.js');
const client = require('../server/db/database.js')
const supertest = require('supertest');

beforeAll(done => {
  done()
})

describe('get a question', () => {
  it('should respond with a 200 code', async () => {
    const response = await supertest(index).get('/api/qa/questions?product_id=100')
    expect(response.statusCode).toBe(200);
  }
)})

describe('get an answer', () => {
  it('should respond with a 200 code', async () => {
    const response = await supertest(index).get('/qa/questions/question_id=5/answers')
    expect(response.statusCode).toBe(200);
  }
)})


describe('/api/product endpoint', () => {
  it('should have a status code of 200', async() => {
    const response = await supertest(index).get('/api/products?product_id=1');
    expect(response.statusCode).toBe(200);
  });
  it('should have an id of 1', async() => {
    const response = await supertest(index).get('/products?id=1');
    expect(response.id).toBe(1);
  });
});




afterAll(done => {
  client.pool.end()
  done()
})