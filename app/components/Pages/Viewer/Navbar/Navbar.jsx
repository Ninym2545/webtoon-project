"use client"
import { ArrowBackIcon, ArrowForwardIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Input, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { ArrowLeftIcon, Bars3Icon, HeartIcon } from '@heroicons/react/24/outline'
import { RxDashboard } from 'react-icons/rx'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { DateHelper } from '@/app/components/DateHelper/DataFormat';
import Link from 'next/link';

async function Navbar({ data, dataimg }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const bg = useColorModeValue('white', 'gray.800')

  const router = useRouter();
  // console.log(data)
  // Function to go back to the previous page in history
  const goBack = () => {
    router.push(`/contents/${data.data._id}`);
  };




  useEffect(() => {
    const hiddenElement = document.getElementById('hiddenElement');
    const hiddenElement1 = document.getElementById('hiddenElement1');
    let isVisible = false;

    function handleScroll() {
      if (window.scrollY === 0) {
        hiddenElement.style.opacity = '1';
        hiddenElement1.style.opacity = '1';
      } else {
        hiddenElement.style.opacity = '0';
        hiddenElement1.style.opacity = '0';
      }

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        hiddenElement.style.opacity = '0';
        hiddenElement1.style.opacity = '0';
      }
    }

    function handleClick() {
      if (isVisible) {
        hiddenElement.style.opacity = '0';
        hiddenElement1.style.opacity = '0';
        isVisible = false;
      } else {
        hiddenElement.style.opacity = '1';
        hiddenElement1.style.opacity = '1';
        isVisible = true;
      }
    }

    // Initial setup
    hiddenElement.style.transition = 'opacity 0.5s ease-in-out';
    hiddenElement1.style.transition = 'opacity 0.5s ease-in-out';
    hiddenElement.style.opacity = '0';
    hiddenElement1.style.opacity = '0';

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const result = {
    nextvalue: null,
    prevvalue: null
  };

  for (let index = data.data.chapter.length - 1; index >= 0; index--) {
    const value = data.data.chapter[index];
    const prevValue = data.data.chapter[index - 1];

    if (index > 0) {
      if (value._id == dataimg._id && prevValue._id != dataimg._id) {
        result.nextvalue = prevValue;
      } else if (value._id != dataimg._id && prevValue._id == dataimg._id) {
        result.prevvalue = value;
      }
    }
  }

  const Nextpage = () => {
    router.push(`/viewer/${data.data._id}/${result.nextvalue._id}`);
  };
  const Prevpage = () => {
    router.push(`/viewer/${data.data._id}/${result.prevvalue._id}`);
  };




  return (
    <div className='fixed w-full z-[100]'>
      <Box id="hiddenElement" zIndex={'100'} backgroundColor={bg} opacity={'0.5'}>
        <div className=" ">
          <header>
            <div className="w-full py-3 flex justify-between px-14 z-[100] ">

              <button onClick={goBack}  >
                <ArrowLeftIcon className="hidden h-6 w-6  sm:inline" />
              </button>

              <div className="flex items-center space-x-4 text-sm ">
                <HeartIcon className="hidden h-6 w-6  sm:inline" />
              </div>
            </div>
          </header>
        </div>
      </Box>
      <Box width={'full'} display={'flex'} justifyContent={'center'}>
        <Box id="hiddenElement1" zIndex={'50'} backgroundColor={bg} display={'flex'} justifyContent={'center'} borderRadius={'full'} bgGradient='linear(to-l, #7928CA, #FF0080)' position={'fixed'} bottom={'10'} opacity={'0.5'}>
          <Box backgroundColor={bg} mx={'5px'} my={'4px'} py={'2px'} borderRadius={'full'}>

            <div>
              <header>
                <div className=" flex items-center  rounded-full w-full m-1">
                  <div className='flex'>
                    {
                      result.nextvalue && (<div className='mx-4'>
                       
                          <ArrowBackIcon onClick={Nextpage} className="hidden sm:inline text-2xl cursor-pointer" />
                        
                      </div>)
                    }
                    <div className="mx-4" ref={btnRef} colorScheme='teal' onClick={onOpen}>
                      <RxDashboard  className="hidden   sm:inline text-2xl cursor-pointer" />
                    </div>
                    {
                      result.prevvalue && (<div className='mx-4'>
                       
                          <ArrowForwardIcon onClick={Prevpage} className="hidden sm:inline text-2xl cursor-pointer" />
                       
                      </div>)
                    }

                  </div>

               
                </div>
              </header>
            </div>
          </Box>
        </Box>
      </Box>


      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ตอนทั้งหมด</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            <div className='mt-2'>
              <ul className="flex flex-wrap Episode_episodeItem ">
                {data.data.chapter.sort((a, b) => b.index - a.index)
                  .map((chap) => (
                    <li className="relative  mx-[2px] my-[2px] lg:!w-[calc((97%)/2)] list-none ">
                      <a
                        className="flex flex-none flex-col h-full relative  overflow-hidden rounded-md"
                        href={`/viewer/${data.data._id}/${chap._id}`}
                      >
                        <div className="relative w-full bg-white/5 rounded-s-md">
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

          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>





  )
}

export default Navbar