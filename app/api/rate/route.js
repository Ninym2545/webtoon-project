import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import RateCoin from "@/models/RateCoin";


export const GET = async (request) => {
  try {
    await connect();
    const ratecoin = await RateCoin.find();

    return new NextResponse(JSON.stringify(ratecoin), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
