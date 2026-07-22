import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts'

export const comparePassword = async (password: string, hash: string) => {
  return compareSync(password, hash)
}

export const hashedPassword = (password: string): string => {
  return hashSync(password, genSaltSync(10))
}
