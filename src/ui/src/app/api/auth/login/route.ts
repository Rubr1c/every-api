import { userReqSchema } from "@/api/user";
import { AppError, STATUS_CODES, StatusCode } from "@/lib/error";
import { generateToken } from "@/lib/jwts";
import { getUserById } from "@/lib/user/user";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod/v4";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = userReqSchema.parse(json);
    const user = await getUserById(data.userId);
    const token = generateToken({ userId: user.id }, "1h");

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return NextResponse.json(
        {
          error: err.message,
        },
        { status: err.statusCode }
      );
    }

    if (err instanceof ZodError) {
      return NextResponse.json(
        { errors: z.treeifyError(err) },
        { status: STATUS_CODES.UNPROCESSABLE_ENTITY }
      );
    }

    return NextResponse.json(
      {
        error: "An internal server error occurred",
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
