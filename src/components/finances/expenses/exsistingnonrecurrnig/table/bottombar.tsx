"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"

import Link from "next/link"
import Image from "next/image"
import { Button } from '@nextui-org/react'

const ExsistingNonRecurringBottomBar = ({ expenseId }: any) => {
    return (
        <>


            <div className="flex justify-between items-center w-full  box-border  bg-white  border-t border-l-0 border-r-0 border-b-0 border-solid border-borderGrey text-gray-400 py-4 rounded-b-lg">
                <div className="flex justify-between items-center gap-4 pl-4">
                    
                </div>
                <div className="flex justify-between items-center gap-4 pr-4">
                    <Link   href={{ pathname: '/finance/expenses/newexpenses', query: { id: expenseId } }} className="no-underline">
                        <Button className="px-4 py-2.5 text-white text-base bg-zinc-900 rounded-md justify-start items-center gap-2 flex border-0 outline-none cursor-pointer">
                            <Image src={drafticon} alt="draft"></Image>
                            <div>Convert to Recurring Expense</div>
                        </Button>
                    </Link>

                </div>
            </div>


        </>
    )
}

export default ExsistingNonRecurringBottomBar