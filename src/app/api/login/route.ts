import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import { connectToDatabase } from '@/lib/mongodb'
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { username, password } = await request.json();

    const user = await User.findOne({
      $or: [
        { username: username },
        { username: username.toLowerCase() },
        { email: username },
        { email: username.toLowerCase() }
      ]
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    // Gerar JWT
    const token = generateToken(user);
    const cookie = setAuthCookie(token);

    return new Response(JSON.stringify({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        country: user.country
      }
    }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
  }
}
