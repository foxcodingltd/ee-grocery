import request from 'supertest'
import { app } from '../../index.js'

describe('Index/Lists page', () => {
    it('Root path should return html', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    it('Lists path should return html', async () => {
        const res = await request(app).get('/lists');
        expect(res.status).toBe(200);
    });
});

describe('Create list', () => {
    it('Should redirect to the updated list page', async () => {
        const res = await request(app).post('/lists/create');
        expect(res.status).toBe(301);
    });
});

describe('Remove list', () => {
    it('Should redirect to the updated list page', async () => {
        const res = await request(app).post('/lists/remove/:1');
        expect(res.status).toBe(301);
    });
});
