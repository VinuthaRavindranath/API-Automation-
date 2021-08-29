import request from '../config/common';
const faker = require('faker');

import { expect } from 'chai';
const TOKEN = process.env.USER_TOKEN;

describe('Create new users', () => {

    it('Post /users', () => {
        const data = {
            email: faker.internet.email(),
            name: faker.name.firstName(),
            gender: 'female',
            status: 'inactive',
        };
        return request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
            });
    });
});