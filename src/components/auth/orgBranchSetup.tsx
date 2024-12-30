
import React, { useState } from 'react';


import { useAppSelector } from "@/lib/hooks";


const OrgDetailsSetup = (props: any) => {

    const stateOptions = [
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Assam', label: 'Assam' },
        { value: 'Bihar', label: 'Bihar' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Haryana', label: 'Haryana' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
        { value: 'Jharkhand', label: 'Jharkhand' },
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Manipur', label: 'Manipur' },
        { value: 'Meghalaya', label: 'Meghalaya' },
        { value: 'Mizoram', label: 'Mizoram' },
        { value: 'Nagaland', label: 'Nagaland' },
        { value: 'Odisha', label: 'Odisha' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Tripura', label: 'Tripura' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
        { value: 'Uttarakhand', label: 'Uttarakhand' },
        { value: 'West Bengal', label: 'West Bengal' },
        { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Lakshadweep', label: 'Lakshadweep' },
        { value: 'Puducherry', label: 'Puducherry' }

      ];
      console.log("this is props",props.data)
      console.log("user data received :",props.data);
      const [resource, setResource] = useState<any>();



    const [focused, setFocused] = useState(false);
    const [focused1, setFocused1] = useState(false);
    const [focused2, setFocused2] = useState(false);
    const [focused3, setFocused3] = useState(false);
    const [focused4, setFocused4] = useState(false);
    const [focused5, setFocused5] = useState(false);
    const appState = useAppSelector((state) => state.app);

    console.log("app state data is : ",appState);

    return (
        <div className="w-[1016px] h-[759px] p-10 rounded-[30px] border border-stone-300 backdrop-blur-[190.90px] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-end gap-10 inline-flex">
                <div className="flex-col justify-start items-start gap-6 flex">
                    <div className="w-[940px] justify-start items-start gap-6 inline-flex">
                    </div>
                    <div className="flex-col justify-start items-start gap-2 flex">
                        <div className="flex justify-around items-center">
                            <div className="text-gray-500 text-xl font-medium mr-6">New Branch</div>

                        </div>
                        <div className="text-neutral-400 text-base font-medium ">Enter your branch details</div>
                    </div>



                </div>
                <div className="self-stretch h-[432px] flex-col justify-start items-start gap-6 flex">
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Name*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-start gap-2 inline-flex">
                                <input type="text" className="text-neutral-400  text-base font-medium  h-full w-full px-2 border border-solid border-[#A2A3A3]  rounded-[5px]" id="orgName" name="orgName" disabled={true} value={props.data.orgName} />
                            </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Branch Name</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400 flex-col justify-center items-start gap-2 inline-flex">
                                <input
                                 type="text" 
                                 className="text-neutral-400 text-base font-medium  h-full w-full px-2 border border-solid border-[#A2A3A3]  rounded-[5px]" 
                                 id="branch"
                                  name="branch"
                                  onChange={props.handleChange}
                                  onFocus={() => setFocused(true)}
                                   value={appState.currentBranch.branchName}
                                    />
                                    {props.validationErrors.branchName && (
                                    <div className="text-[red] error">{props.validationErrors.branchName}</div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">GSTIN Number*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="gstNo"
                                    name="gstNo"
                                    
                                    onFocus={() => setFocused(true)}
                                    value={props.data.gstNo}
                                />
                                {focused && props.data.gstNo.length <= 1 && (
                                    <div className="text-red-500 text-sm">GST No. is required.</div>
                                )}
                            </div>
                        </div>


                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Phone Number*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="phoneNo"
                                    name="phoneNo"
                                    onChange={props.handleChange}
                                    onFocus={() => setFocused1(true)}
                                    value={props.data.phoneNo}
                                />
                                {focused1 && props.data.phoneNo.length == 9 && (
                                    <div className="text-red-500 text-sm">Valid Phone Number is required.</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Org. Email*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="email"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="orgEmail"
                                    name="orgEmail"
                                    onChange={props.handleChange}
                                    onFocus={() => setFocused2(true)}
                                    value={props.data.orgEmail}
                                />
                                 {props.validationErrors.orgEmail && (
                                    <div className="text-[red] error">{props.validationErrors.orgEmail}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Org. Address*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="text"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="address"
                                    name="address"
                                    onChange={props.handleChange}
                                    onFocus={() => setFocused3(true)}
                                    value={props.data.address}
                                />
                                {focused3 && props.data.address.length <= 1 && (
                                    <div className="text-red-500 text-sm">Address is required.</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Select State*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border border-neutral-400">
                                <input
                                    type="text"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="state"
                                    name="state"
                                    onChange={props.handleChange}
                                    onFocus={() => setFocused4(true)}
                                    value={props.data.state}
                                />
                                {focused4 && props.data.state.length <= 1 && (
                                    <div className="text-red-500 text-sm">State is required.</div>
                                )}
                            </div>
                        </div>
                        <div className="grow shrink basis-0 h-11 justify-start items-center gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium">Pincode*</div>
                            <div className="grow shrink basis-0 h-11 bg-white rounded-[5px] border 1px border-neutral-400  ">
                                <input
                                    type="number"
                                    className="text-neutral-400 text-base font-medium h-full w-full px-2 focus:outline-none border border-solid border-[#A2A3A3] rounded-[5px] focus:border focus:border-emerald-200"
                                    id="pincode"
                                    name="pincode"
                                    onChange={props.handleChange}
                                    onFocus={() => setFocused5(true)}
                                    value={props.data.pincode}
                                />
                                {props.validationErrors.pincode && (
                                    <div className="text-[red] error">{props.validationErrors.pincode}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-[92px] justify-start items-start gap-10 inline-flex">
                        <div className="grow shrink basis-0 h-[92px] self-stretch justify-start items-start gap-4 flex">
                            <div className="w-[136px] text-gray-500 text-base font-medium ">Description</div>
                            <textarea className="px-2 py-2 w-full h-full ml-6 text-neutral-400 text-base focus:outline-none border border-solid border-[#A2A3A3]  rounded-[5px]  focus:border focus:border-emerald-200" id="description" name="description" value={props.data.description} onChange={props.handleChange} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrgDetailsSetup;
