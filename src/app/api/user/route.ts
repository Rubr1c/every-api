import { getUserById } from '@/lib/db/user/user';
import { AppError, STATUS_CODES } from '@/lib/utils/error';
import { verifyToken } from '@/lib/utils/jwts';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const tokenSchema = z.object({
  token: z.string(),
});

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
      throw new AppError(
        'Missing or malformed Authorization header',
        'UNAUTHORIZED'
      );
    }

    const token = auth.slice(7);
    tokenSchema.parse({ token });

    const { userId } = verifyToken(token);
    const user = await getUserById(userId);

    const safeUser = {
      ...user,
      xp: user.xp.toString(),
      discordId: user.discordId ? user.discordId.toString() : null,
    };

    return NextResponse.json(safeUser, { status: STATUS_CODES.OK });
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
