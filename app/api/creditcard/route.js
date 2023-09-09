import User from "@/models/User";
import history from "@/models/history";
import connect from "@/utils/db";
import { NextResponse } from "next/server";


let omise = require('omise')({
  'publicKey': 'pkey_test_5wvk6rjken7blkymrl2',
  'secretKey': 'skey_test_5wvk6rl1rkq4b01js2e',
});


export const POST = async (request ) => {
  
  const { email, name, creditprice, token, coin , user_id} = await request.json();
  const defaultPrice = creditprice / 100
  await connect();

  try {

    
    const customer = await omise.customers.create({
      'email': email,
      'description': name,
      'card': token,
    });

    const charge = await omise.charges.create({
      'amount':   creditprice,
      'currency': 'thb',
      'customer': customer.id,
    });

    const createHistory = new history({
      user_id: user_id,
      coin: coin,
      price: defaultPrice
    });
    await createHistory.save();
    console.log("Create History been success");

    await User.findOneAndUpdate({
      _id : user_id
    },{
     $inc:{coin: coin}
    })

    return new Response(JSON.stringify({
      status: charge.status,
      amount: charge.amount
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.log("err: ", err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
