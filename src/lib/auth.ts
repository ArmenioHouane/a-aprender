import jwt from "jsonwebtoken"
import { serialize } from "cookie"
import type { JwtPayload } from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "minha-chave-secreta"

interface User {
  _id: string
  email: string
  name: string
  avatar?: string
  firebaseId?: string | null
}

interface CustomJwtPayload extends JwtPayload {
  id: string
  email: string
  name: string
  avatar?: string
  firebaseId?: string
}

export function generateToken(user: User): string {
  const payload: CustomJwtPayload = {
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar || "",
  }

  if (user.firebaseId) {
    payload.firebaseId = user.firebaseId
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" })
}

export function setAuthCookie(token: string, options = {}) {
  return serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    ...options,
  })
}

export function verifyToken(token: string): CustomJwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload
    return decoded
  } catch (error) {
    console.error("Erro na validação do token:", error)
    return null
  }
}
