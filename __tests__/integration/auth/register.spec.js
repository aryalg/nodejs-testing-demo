/**
 * @jest-environment node
 */


import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'
import User from '@models/user'


const app = () => supertest(server)

describe('The Register Process', () => {

    const REGISTER_ENDPOINT = '/api/v1/auth/register'

    let user = {
        name: 'Test User',
        email: 'test1@gmail.com',
        password: 'kathmandu'
    }

    beforeEach(async () => {
        await User.deleteMany({})

    })
    it('should register a new user', async () => {
        const response = await app().post(REGISTER_ENDPOINT).send(user)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Account registered.')
        expect(response.body.data.token).toBeDefined()

    })


    it('should return 422 if registration fails', async () => {
        // prepration
        const createdUser = await User.create(user)


        // action
        const response = await app().post(REGISTER_ENDPOINT).send(user)

        // assertion
        expect(response.status).toBe(422)

        expect(response.body.message).toBe('Validation failed.')

        expect(response.body.data.errors).toEqual({
            email: 'This email has already been taken.'
        })


    })

    afterAll(async () => {
        await disconnect()

    })
})