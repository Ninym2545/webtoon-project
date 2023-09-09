import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Category from '../../../models/Webtype'

export const GET = async (request) => {
  try {
    await connect();
    const category = await Category.find();

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
