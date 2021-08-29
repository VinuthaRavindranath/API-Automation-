import request from '../config/common';
import { expect } from 'chai';
import { createRandomUserWithFaker } from '../helper/api';

const TOKEN = process.env.USER_TOKEN;
let userId;

describe('Delete User', () => {
    before(async() => {
        userId = await createRandomUserWithFaker();
    });
    it('Delete /users/id', () => {
        return request
            .delete(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.be.eq(undefined);
            })
    });
});