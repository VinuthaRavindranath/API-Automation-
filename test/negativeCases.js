import request from '../config/common';
const faker = require('faker');
import { expect } from 'chai';

const TOKEN = process.env.USER_TOKEN;

describe('negative cases', () => {
    it('401 error code validation', async() => {
        const data = {
            email: faker.internet.email(),
            name: faker.name.firstName(),
            gender: 'female',
            status: 'inactive',
        };

        const postRes = await request.post('users').send(data).expect(401);
        expect(postRes.body.data.message).to.eq('Authentication failed');
    });

    it('422 error code validation', async() => {
        const data = {
            email: faker.internet.email(),
            name: faker.name.firstName(),
            gender: 'female',
        };

        const postRes = await request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .expect(422);
        expect(postRes.body.data[0].field).to.eq('status');
        expect(postRes.body.data[0].message).to.eq("can't be blank");
    });

    it('404 error code validation', async() => {
        const postRes = await request
            .get('users/3456789')
            .set("Authorization", `Bearer ${TOKEN}`)
            .expect(404);
        expect(postRes.body.data.message).to.eq('Resource not found');
    });
});