import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Webtoon from "../../../models/Content";

export const GET = async (request) => {
  try {
    await connect();
    const webtoon = await Webtoon.find();

    return new NextResponse(JSON.stringify(webtoon), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
