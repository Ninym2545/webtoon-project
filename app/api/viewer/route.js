import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import ChapterImg from "../../../models/ChapterImg";

export const GET = async (request) => {
  try {
    await connect();
    const chapterimg = await ChapterImg.find();

    return new NextResponse(JSON.stringify(chapterimg), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
