import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Chapter from "../../../models/Chapter";

export const GET = async (request) => {
  try {
    await connect();
    const chapter = await Chapter.find();

    return new NextResponse(JSON.stringify(chapter), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
