import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create.controller'
import { getPetById } from './get-pet-by-id.controller'
import { getPets } from './get-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPetById)
  app.get('/pets', getPets)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
