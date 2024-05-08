import { hash } from 'bcryptjs'

export async function encryptPassword(password: string): Promise<string> {
  return hash(password, 10)
}
