import request from '../config/common';

import { expect } from 'chai';
import { createRandomUserWithFaker } from '../helper/api';

const TOKEN = process.env.USER_TOKEN;
let userId;

describe('users', () => {
    before(async() => {
        userId = await createRandomUserWithFaker();
    });
    it('GET /users', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });

    it('GET /users/id', () => {
        return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(userId);
        });
    });

    it('GET /users with query params', () => {
        const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
        return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    })
});