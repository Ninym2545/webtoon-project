import React from 'react'
import { verifyWithCredentials } from '../api/auth/register/route'
import Swal from 'sweetalert2'

const page = async ({ searchParams: { token } }) => {

    // const res = await verifyWithCredentials(token);

    return (
        <div className='container'>
            {/* {res?.message !== null ? (
                <div className='flex justify-center text-center my-auto'>
                    <h2 className='text-3xl'>
                        {res?.message}
                    </h2>
                </div>
            ) : null} */}
        </div>
    )
}

export default page