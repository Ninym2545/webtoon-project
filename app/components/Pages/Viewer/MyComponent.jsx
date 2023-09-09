"use client"
import React from 'react'
import Navbar from '../Viewer/Navbar/Navbar'
import Data from './Data/Data'

async function getDataChapter(contentid) {

  const res = await fetch(`http://localhost:3000/api/chapter/${contentid}`, {
    cache: "no-store",
  });


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/viewer/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const MyComponent = async ({ viewer }) => {



  const post = await getData(viewer.id);
  const con = await getDataChapter(viewer.contentid);
  return (
    <>
      <Navbar data={con} dataimg={post} />
      <div className='container'>
        <Data data={post} />
      </div>
    </>

  )
}

export default MyComponent