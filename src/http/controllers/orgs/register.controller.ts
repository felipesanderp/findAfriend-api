import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/orgs/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    name: z.string(),
    phone: z.string(),
    zipcode: z.string(),
  })

  const { email, password, address, name, phone, zipcode } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrgUseCase()

    const data = await registerUseCase.execute({
      address,
      email,
      name,
      password,
      phone,
      zipcode,
    })

    return reply.status(201).send(data)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
