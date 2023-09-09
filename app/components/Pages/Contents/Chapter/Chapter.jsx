"use client"
import React from 'react'
import styles from './Chapter.module.css'
import { DateHelper } from "../../../DateHelper/DataFormat";
import { Box, useColorModeValue } from '@chakra-ui/react';



async function getDataChapter(content_id) {
  
  const res = await fetch(`http://localhost:3000/api/chapter/${content_id}`, {
    cache: "no-store",
  });


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Chapter = async ({ webtoon }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const chapter = await getDataChapter(webtoon);
 
  
  return (
    <div>
      <div className="mx-auto  pb-0  items-center mt-6 mb-1">
        <Box backgroundColor={bg} opacity={'0.8'} h={'48px'} >
          <h2 className="text-center pt-3 text-lg opacity-100 ">
            จำนวน {chapter.total} ตอน
          </h2>
        </Box>
      </div>
      <div>
        <ul className="flex flex-wrap Episode_episodeItem ">
          {chapter.data.chapter.sort((a, b) => b.index - a.index)
            .map((chap) => (
              <li className="relative  mx-[2px] my-[2px] lg:!w-[calc((98.3%-3px)/6)] md:!w-[calc((98%-3px)/5)]">
                <a
                  className="flex flex-none flex-col h-full relative  overflow-hidden"
                  href={`/viewer/${webtoon}/${chap._id}`}
                >
                  <div className="relative w-full bg-white/5 ">
                    <div className="overflow-hidden  inset-0">
                      <picture className="flex w-full h-full">
                        <img
                          src={chap.img}
                          className="w-full h-full object-cover opacity-70"
                        />
                      </picture>
                    </div>
                  </div>
                  <Box px={'12px'} pt={'4px'} pb={'4px'} backgroundColor={bg}  >
                    <p className="whitespace-pre-wrap break-all break-words support-break-word overflow-hidden text-ellipsis !whitespace-nowrap leading-14 s12-regular-white">
                      {chap.index}
                    </p>
                    <div className="flex items-center mt-1">
                      <p className="whitespace-pre-wrap break-all break-words support-break-word overflow-hidden text-ellipsis !whitespace-nowrap leading-14 opacity-50 s11-regular-white">
                        {DateHelper.convertJsDateToSqlDateFormat(new Date(chap.date_upload), false)}
                      </p>
                    </div>
                  </Box>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Chapter