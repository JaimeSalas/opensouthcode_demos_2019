// describe('simple test', () => {
//     it('just pass', () => {
//         expect(true).toBeTruthy();
//     });
// });
// https://stackoverflow.com/questions/35706164/typescript-import-as-vs-import-require
import request = require('supertest');

describe('root route is working', () => {
    it('responds with 200 status code', (done) => {
        const app = require('./app');

        request(app)
            .get('/')
            .expect(200)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    });
});