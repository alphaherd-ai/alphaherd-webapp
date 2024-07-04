import React from 'react'

const page = () => {
  return (
    <div className="mx-auto w-6/12 bg-white mt-[25px] rounded-[10px] border border-solid border-neutral-400 flex-auto justify-center flex">
                    <div className="w-full border-b border-solid border-0 border-stone-300 flex items-start justify-between">
                        <div className="p-6 flex items-start justify-between w-full">
                            <div className="text-gray-500 text-xl font-medium ">
                                Stock History
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    {/* <Image src={downloadicon} alt="download" className="w-5 h-5"/> */}
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    {/* <Image src={baricon} alt="baricon" className="w-5 h-5" /> */}
                                </div>
                                <div className="w-8 h-8 px-1.5 py-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    {/* <Image src={expandicon} alt="expandicon" className="w-5 h-5" /> */}
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid  border-neutral-400 justify-start items-center gap-2 flex">
                                    {/* <Image src={tuneicon} alt="tuneicon" className="w-5 h-5" /> */}
                                    <div className="text-neutral-400 text-sm font-medium ">
                                        Filter by
                                    </div>
                                </div>
                                <div className=" h-7 p-2 bg-white rounded-[5px] border border-solid border-neutral-400 justify-start items-center gap-2 flex">
                                    {/* <Image src={downarrow} alt="downarrow" className="w-5 h-5" /> */}
                                    <div className="text-neutral-400 text-sm font-medium ">
                                        Status: All
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</div>
  )
}

export default page