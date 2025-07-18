import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expira imediatamente
  });

  return new Response(JSON.stringify({ success: true, message: "Logout bem-sucedido" }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}
