import request from '../config/common';
const faker = require('faker');
import { expect } from 'chai';
import { createRandomUserWithFaker } from '../helper/api';

const TOKEN = process.env.USER_TOKEN;
let userId;

describe('Update user', () => {
    before(async() => {
        userId = await createRandomUserWithFaker();
    });
    it('PUT /users/id', () => {
        const data = {
            status: 'inactive',
            name: faker.name.firstName(),
        };
        return request
            .put(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
            });
    });
});