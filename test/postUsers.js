import request from '../config/common';
const faker = require('faker');
import { expect } from 'chai';
import { createRandomUserWithFaker } from '../helper/api';

const TOKEN = process.env.USER_TOKEN;

let userId, postId;

describe('User Posts', () => {
    before(async() => {
        userId = await createRandomUserWithFaker();
    });

    it('/posts', async() => {
        const data = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(),
        };
        const res = await request
            .post('posts')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data);
        expect(res.body.data).to.deep.include(data);
        postId = res.body.data.id
    });

    it('GET /posts/id', async() => {
        await request
            .get(`posts/${postId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
        expect(200);

    });
});