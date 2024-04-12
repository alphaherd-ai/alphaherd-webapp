"use client"
import { redirect } from 'next/navigation';
import {getServerSession} from 'next-auth'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { useRef } from 'react';

export default function Home() {

  const store = useAppStore();
  const user= useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log("user", user)

  return (
    <>
    <p className='m-0'>Home</p>
    </>
  )
}