/* eslint-disable @next/next/no-async-client-component */
"use client"
import { redirect } from 'next/navigation';
import {getServerSession} from 'next-auth'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { useRef } from 'react';
import Header from '@/components/home/Header/Header';
import Table from '@/components/home/Table/Table';

export default async function Home() {

  const store = useAppStore();
  const user= useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log("user", user)

  return (
    <div className='w-full bg-gray-200 p-4 px-6 min-h-screen'>
    <Header />
    <Table />
    </div>
  )
}