import db from "db"
import { SecurePassword } from "@blitzjs/auth/secure-password"

export default async function signup(
  input: { name: string; surname: string; password: string; email: string },
  ctx: any
) {
  const blitzContext = ctx
  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = (input.email as string) || "test" + Math.random() + "@test.com"
  const name = (input.name as string) || "testName"
  const surname = (input.surname as string) || "testSurname"
  const user = await db.user.create({
    data: { name, surname, email, hashedPassword },
  })

  await blitzContext.session.$create({
    userId: user.id,
    role: "user",
  })

  return { userId: blitzContext.session.userId, ...user, email: input.email }
}
