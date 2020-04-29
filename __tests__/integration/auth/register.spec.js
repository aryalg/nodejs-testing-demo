/**
 * @jest-environment node
 */


import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'
import User from '@models/user'


const app = () => supertest(server)

describe('The Register Process', () => {

    beforeEach(async () => {
        await User.deleteMany({})

    })
    it('should register a new user', async () => {
        const response = await app().post('/api/v1/auth/register').send({
            name: 'Test User',
            email: 'test1@gmail.com',
            password: 'kathmandu'
        })

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Account registered.')
        expect(response.body.data.token).toBeDefined()

        await disconnect()
    })
})