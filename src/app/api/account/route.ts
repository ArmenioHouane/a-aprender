import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"
import { verifyToken } from "@/lib/auth"  // Função que valida o JWT

// Função GET para retornar os dados do usuário logado
export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;  // Verificar o token no cookie

  if (!token) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  try {
    const user = verifyToken(token);  // Verificar o token e obter os dados do usuário

    if (!user) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    await connectToDatabase();
    const userData = await User.findById(user.id).select("-password"); // Seleciona o usuário e exclui a senha

    if (!userData) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar dados do usuário" }, { status: 500 });
  }
}

// Função PUT para atualizar os dados do usuário logado
export async function PUT(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  try {
    const user = verifyToken(token);  // Verificar o token e obter os dados do usuário

    if (!user) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const body = await req.json();  // Recebe os dados a serem atualizados
    const updatedUser = await User.findByIdAndUpdate(user.id, body, { new: true });  // Atualiza o usuário no banco

    if (!updatedUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// Função DELETE para excluir o usuário logado
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  try {
    const user = verifyToken(token);  // Verificar o token e obter os dados do usuário

    if (!user) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(user.id);  // Deleta o usuário do banco

    if (!deletedUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuário removido com sucesso" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao remover usuário" }, { status: 500 });
  }
}
