"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Flex, FormControl, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import { AiOutlineCreditCard } from 'react-icons/ai'
import { CheckIcon, PhoneIcon } from '@chakra-ui/icons';
import { Input, Stack, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import Script from 'next/script'
import Swal from 'sweetalert2'
require('dotenv').config();
// import * as Omise from 'omise';

async function getData() {
    const res = await fetch("http://localhost:3000/api/rate", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


const Mycomponent = () => {
    const session = useSession();
    const { status } = useSession();
    const router = useRouter();
    const bg = useColorModeValue('white', 'gray.700')
    const payment = useColorModeValue('white', 'gray.500')
    const form = useColorModeValue('gray.100', 'gray.600')

   

    let omiseCard;
    async function handleloadscript() {
        omiseCard = window.OmiseCard;

        OmiseCard.configure({
            publicKey: 'pkey_test_5wvk6rjken7blkymrl2',
            frameLabel: 'WEBTOON NFT',
            submitLabel: 'PAY NOW',
            buttonLabel: 'Pay with Omise'
        });
    }

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: []
        })
        OmiseCard.configureButton('#credit-card');
        OmiseCard.attach();
    }

    const omisehandler = () => {
        OmiseCard.open({
            amount: creditprice,
            currency: "THB",
            submitFormTarget: '#checkout-form',
            onCreateTokenSuccess: (token) => {
                createCreditCharge( creditprice , token )
            },
            onFormClosed: () => {
                /* Handler on form closure. */
            },
        })
    }

    const [data, setData] = useState(null);

    async function createCreditCharge(creditprice , token  ) {
        const user_id = session.data.user._id
        const name = session.data.user.name
        const email = session.data.user.email
        const coin = creditcoin
        try {

            const res = await fetch("/api/creditcard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    creditprice,
                    token,
                    coin,
                    user_id

                }),
            });       
            const responseData = await res.json();

            if(responseData == null){
                return
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `ชำระเงินจำนวน ${responseData.amount / 100} บาทเสร็จสิ้น` ,
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(() => {
                location.reload()
            }, 2000);



        } catch (err) {
           console.log(err);
        }
      
      }



    const handleClick = (e) => {
        e.preventDefault();
        creditCardConfigure();
        omisehandler();
    }

    if (status === "unauthenticated") {
        router?.push("/");
    }

    const [rate, setRate] = useState([

    ]);

    useEffect(() => {
        const data = getData().then(value => {
            console.log("data : ", value);
            setRate(value);
        });

    }, []);

    const [dataselect, setdataselect] = useState();

    let [creditprice , setCreditPrice] = useState() ;
    let [creditcoin , setCreditCoin] = useState() ;
   

    async function selectdata(e) {
        const value = e.target.value
        // console.log(value)

        const datafilter = rate.filter((item) => item.coin == value);
        // console.log("filter", datafilter)
        const creditPrice = datafilter[0].price * 100
        const creditCoin = datafilter[0].coin 
        setCreditPrice(creditPrice)
        setCreditCoin(creditCoin)
        setdataselect(datafilter)

        document.querySelector("#show-coin").innerHTML = datafilter[0].coin.toLocaleString();
        document.querySelector("#show-price").innerHTML = datafilter[0].price.toLocaleString();
        // document.querySelector("#pay-price").innerHTML = datafilter[0].price.toLocaleString();
        // document.querySelector("#show-day-za").value = datafilter[0].day.toString();
    }
    // console.log(creditprice);
    return (
        <div className='mt-28'>
            <div className=''>
                <h1 className="text-3xl font-bold">เติมแคช</h1>
            </div>
            <div className={styles.component}>
                <Box p={'20px'} rounded={'10px'} shadow={'md'} gridColumn={'span 2'} gridRow={'span 3'} backgroundColor={bg} borderWidth={'1px'}>
                    <div className="flex justify-between p-3 ">
                        <h1 className="text-lg flex justify-start">แคชที่มี</h1>
                        <h1 className="text-lg flex justify-start"> {session.data?.user.coin.toLocaleString()} แคช</h1>
                    </div>
                    <div className="m-4 ">
                        <div className="mb-5">
                            <h1 className="text-2xl font-semibold">เติมแคช</h1>
                        </div>
                        <ul class=" flex flex-wrap gap-4 content-start m-5">
                            {
                                rate.map((rate) => (
                                    <li className='flex-[calc((90%)/2)]'>
                                        <input onChange={selectdata} type="radio" id={rate.coin} name="hosting" value={rate.coin} class="hidden peer" required />
                                        <label for={rate.coin} class="ratetheme dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                                            <div class="block">
                                                <div class=" text-lg font-semibold">{rate.coin.toLocaleString()} แคช</div>
                                                <div class="font-semibold">฿ {rate.price.toLocaleString()}</div>
                                            </div>
                                            <div className='my-auto'>
                                                <svg class="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </div>
                                        </label>
                                    </li>
                                ))
                            }


                        </ul>
                    </div>

                </Box>
                <Box p={'20px'} rounded={'10px'} shadow={'md'} gridColumn={'span 2'} gridRow={'span 2'} backgroundColor={bg} borderWidth={'1px'}>
                    <div className="m-5">
                        <h1 className="text-2xl font-semibold">รายละเอียด</h1>
                    </div>
                    <div className="m-5">
                        <div>
                            <h1 className="text-lg flex justify-start pb-2" >จำนวนแคช : <span id="show-coin" className='ml-2'> </span><span className='ml-2'>แคช</span></h1>
                            <h1 className="text-lg flex justify-start">ราคา : <span id="show-price" className='ml-2'> </span><span className='ml-2'>บาท</span> </h1>
                        </div>
                    </div>
                    <div className="m-5">
                        <h1 className="text-2xl font-semibold">ช่องทางการชำระเงิน</h1>
                    </div>
                    <div className='m-5 flex'>
                        <Tabs variant='soft-rounded' colorScheme='gray' width={'96.9%'} >
                            <TabList backgroundColor={payment} borderRadius={'full'} display={'flex'} p={'1'}>
                                <Script src="https://cdn.omise.co/omise.js" onLoad={handleloadscript}></Script>
                                <form>
                                    <Tab>
                                        <button id='credit-card' onClick={handleClick} className='flex justify-center text-center '>
                                            <AiOutlineCreditCard className="w-8 h-8 " /><span className='mx-1 my-auto'>Credit Card</span>
                                        </button>
                                    </Tab>
                                </form>
                                <Tab> <img src="MetaMask_Fox.svg.png" className="w-8 h-8 mx-1" />MetaMark</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {/* <form onSubmit={creditinput}>
                                    <Box backgroundColor={form} p={'5'} borderRadius={'lg'}>
                                        <Stack spacing={3}>
                                            <FormControl name="cardnumber">
                                                <FormLabel>Credit card number</FormLabel>
                                                <Input type="text" />
                                            </FormControl>
                                            <FormControl name="name">
                                                <FormLabel>Name on card</FormLabel>
                                                <Input type="text" />
                                            </FormControl>
                                            <Flex gap={'20px'}>
                                                <FormControl name="expirydate">
                                                    <FormLabel>Expiry date</FormLabel>
                                                    <Input type="text" />
                                                </FormControl>
                                                <FormControl name="cvc">
                                                    <FormLabel>CVV/CVC</FormLabel>
                                                    <Input type="text" />
                                                </FormControl>
                                            </Flex>
                                        </Stack>
                                        <Box display={'flex'} justifyContent={'center'} mt={'4'}>
                                        <Button
                                            type='submit'
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            ชำระเงิน
                                        </Button>
                                        </Box>
                                    </Box>
                                    </form> */}

                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>


                </Box>
            </div>
        </div>
    )
}

export default Mycomponent