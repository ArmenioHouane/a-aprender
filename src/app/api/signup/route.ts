import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const { name, country, username, email, password, privacySettings, messagePermissions, phoneNumber } = await request.json()

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 })
    }

    // Hasheia a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o novo usuário
    const newUser = new User({
      name,
      country,
      username,
      email,
      password: hashedPassword,
      privacySettings,
      messagePermissions,
      phoneNumber,
      status: 'Active',
      role:'guest',
      subscription: 'Free', // Correção aqui
      accessLevel: 'Basic',
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`
    })

    await newUser.save()

    return NextResponse.json({ 
      success: true, 
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        country: newUser.country
      }
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Signup error:', error)
  
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message || 'An error occurred during signup' }, { status: 500 })
    }
  
    // Caso o erro não seja uma instância de Error, retorna uma mensagem genérica
    return NextResponse.json({ success: false, message: 'An error occurred during signup' }, { status: 500 })
  }  
}
