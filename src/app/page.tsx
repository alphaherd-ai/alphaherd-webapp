/* eslint-disable @next/next/no-async-client-component */
"use client"
import { redirect } from 'next/navigation';
import {getServerSession} from 'next-auth'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { useRef } from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header/Header';
import Table from '@/components/home/Table/Table';

export default function Home() {

  const store = useAppStore();
  const user= useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log("user", user)

  return (
    <>
    <Head>
    <link rel="icon" href="/alphaherd/favicon.ico" sizes="any" />
    </Head>
    <div className='w-full bg-[#EDEDED] p-4 px-6 min-h-screen'>
    <Header />
    <Table />
    </div>
    </>
  )
}