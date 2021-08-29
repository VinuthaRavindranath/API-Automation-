import request from '../config/common';
import { expect } from 'chai';

const TOKEN = process.env.USER_TOKEN;
let userId;

describe('Create new users using Post', () => {
    it('Post /users', () => {
        const data = {
            email: `vr${Math.floor(Math.random() *9999)}@gmail.com`,
            name: 'VR',
            gender: 'female',
            status: 'inactive',
        };
        return request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
                userId = res.body.data.id;
            });
    });
});

describe('Get user using Get', () => {
    it('GET /users', () => {
        return request
            .get('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .then((res) => {
                expect(res.body.data).to.not.be.empty;
            });
    });

    it('GET /users/id', () => {
        return request
            .get(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then((res) => {
                expect(res.body.data.id).to.be.eq(userId);
            });
    });

    it('GET /users with query params', () => {
        const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
        return request
            .get(url)
            .then((res) => {
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach(data => {
                    expect(data.gender).to.eq('female');
                    expect(data.status).to.eq('active');
                });
            });
    })
});

describe('Update user', () => {
    it('PUT /users/id', () => {
        const data = {
            status: 'inactive',
            name: `VR${Math.floor(Math.random() *9999)}`,
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

describe('Delete User', () => {
    it('Delete /users/id', () => {
        return request
            .delete(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.be.eq(undefined);
            })
    });
});