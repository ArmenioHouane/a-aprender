import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');

    // You can set any logic to handle the theme
    // Here we just respond with the received theme
    return NextResponse.json({ theme });
}
