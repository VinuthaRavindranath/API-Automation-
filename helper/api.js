const faker = require('faker')
import request from '../config/common'

const TOKEN = process.env.USER_TOKEN;

export const createRandomUserWithFaker = async() => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        gender: 'female',
        status: 'inactive',
    };
    const res = await request
        .post('users')
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(userData);
    return res.body.data.id;
}