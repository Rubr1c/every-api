import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';
import { generateToken } from '@/lib/jwts';
import { getUserById } from '@/lib/user/user';
import { AppError, STATUS_CODES } from '@/lib/error';

const loginSchema = z.object({
  id: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { id } = loginSchema.parse(json);

    const user = await getUserById(id);

    const token = generateToken({ userId: user.id });

    return NextResponse.json(
      {
        user: {
          ...user,
          xp: user.xp.toString(),
          discordId: user.discordId?.toString(),
        },
        token,
      },
      { status: STATUS_CODES.OK }
    );
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    if (err instanceof ZodError) {
      return NextResponse.json(
        { errors: err.errors },
        { status: STATUS_CODES.UNPROCESSABLE_ENTITY }
      );
    }

    console.error('Unexpected error in login API:', err);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
