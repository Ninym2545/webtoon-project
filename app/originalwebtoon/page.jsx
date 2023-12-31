import React from 'react'
import dynamic from 'next/dynamic';

const MyClientComponent = dynamic(() => import('../components/Pages/OriginalWebtoon/MyComponent'), {
  ssr: false, // Treat this component as a "Client Component"
});

export const metadata = {
    title: "ตารางเว็บตูน",
    description: "Generated by create next app",
  };

const page = () => {
  return (
    <div className='container'>
        <MyClientComponent />
    </div>
  )
}

export default page