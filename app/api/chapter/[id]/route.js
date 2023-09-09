import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import Contents from "../../../../models/Content";

export const GET = async (request , {params}) => {
  const {id} = params;
  try {
    await connect();

    const webtoon = await Contents.findById({
      _id: id
    })

    return new NextResponse(JSON.stringify({data:webtoon,total:webtoon.chapter.length}), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};