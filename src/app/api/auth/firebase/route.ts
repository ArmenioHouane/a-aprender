import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import admin from "@/lib/firebaseConfig";
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Verifica o token JWT do Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    await connectToDatabase();

    let user = await User.findOne({ $or: [{ firebaseId: uid }, { email }] });

    if (!user) {
      user = new User({
        firebaseId: uid,
        email,
        name: name || "Usuário Firebase",
        avatar: picture || "",
        username: `user_${uid.slice(0, 5)}`,
      });

      await user.save();
    }

    // Gera o JWT
    const jwtToken = generateToken(user);
    const cookie = setAuthCookie(jwtToken);

    return new Response(JSON.stringify({ message: "Login bem-sucedido", user }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return NextResponse.json({ error: "Erro ao autenticar usuário" }, { status: 500 });
  }
}
