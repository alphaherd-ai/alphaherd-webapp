import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import updatelogo from "../../../assets/icons/loginsignup/update_logo.png";
import React from 'react';
import * as Yup from 'yup';


const OrgDetailsSetup = (props: any) => {

    const validationSchema = Yup.object().shape({
        orgName: Yup.string().required('Required'),
        gstNo: Yup.string().required('GSTIN No. is required'),
        phoneNo: Yup.string().required('Phone No. is required'),
        orgEmail: Yup.string().email('Invalid email address').required('Email is required'),
        address: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string().required('PIN Code is required'),
        description: Yup.string().required('Description is required')
    });
    
    return (
        <div>
            <Formik
                initialValues={{
                    orgName: '',
                    gstNo: '',
                    branchName: '',
                    phoneNo: '',
                    orgEmail: '',
                    address: '',
                    state: '',
                    pincode: '',
                    description: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form>
                    <div className="w-[1024px] h-[86vh] p-8 rounded-[20px] flex-col justify-start items-start gap-6 flex">
                        <div className="flex-col justify-start items-start gap-2 flex">
                            <div className="text-gray-500 text-xl font-medium font-['Satoshi']">My Organisation</div>
                            <div className="text-neutral-400 text-base font-medium font-['Satoshi']">Enter your organisation details</div>
                        </div>
                        <div className="flex items-center gap-[24px] w-full">
                            <div className="w-1/2 flex justify-center items-center gap-10 ">
                                <label htmlFor="orgName" className="text-gray-500 text-base font-medium font-['Satoshi']">Name</label>
                                <div className="grow shrink basis-0 h-[22px] justify-start items-center gap-4 flex">
                                    <Field className="mt-[4px] px-[0.5rem] border-0 h-10 w-[20rem] bg-white ml-[0.7rem]" type="text" id="orgName" name="orgName" disabled={true} value={props.data.orgName}/>
                                </div>
                                <div className="text-right text-gray-500 text-base font-medium font-['Satoshi']"> </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-center items-center gap-8">
                                    <label htmlFor="gstNo" className="text-gray-500 text-base font-medium font-['Satoshi']">GSTIN No.</label>
                                        <Field className="border-0 h-10 w-[18.2rem] px-2 ml-[1rem]" type="number" id="gstNo" name="gstNo"  value={props.data.gstNo}  onChange={props.handleChange}/>

                                </div>
                                <div className="ml-[7rem] mt-1 text-[#fb2f2f]">
                                    <ErrorMessage name="gstNo" />
                                </div>
                            </div>
                        </div>

                        <label htmlFor="orgBranch" className="text-gray-500 text-base font-medium font-['Satoshi'] ">Branch Name</label>
                                    <div className="flex flex-col justify-center items-center">
                                        <Field className="border-0 h-11 w-[18rem] ml-[0.6rem] text-md px-2" type="text" id="branchName" name="branchName" value={props.data.branchName} onChange={props.handleChange}/>
                                    <div className="mr-[8.5rem] mt-1 text-[#fb2f2f]">
                                        <ErrorMessage name="orgBranch" />
                                    </div>
                        </div>

                        <div className="flex items-center gap-[100px] w-full">
                            <div className="flex justify-center items-center">
                                <label htmlFor="phoneNo" className="text-gray-500 text-base font-medium font-['Satoshi'] mr-[1.5rem]">Phone No.</label>
                                <div className="py-[13px] px-2 border-solid h-full border-0 border-r border-neutral-400 bg-white">+91</div>
                                    <div className="grow shrink basis-0 h-10 justify-start items-center gap-2 flex">
                                        <Field className="border-0 focus:border-0 select:border-0 h-11 w-[17.4rem] px-2" type="text" id="phoneNo" name="phoneNo" minLength={10} maxLength={10} value={props.data.phoneNo} onChange={props.handleChange}/>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">

                                <label htmlFor="orgEmail" className="text-gray-500 text-base font-medium font-['Satoshi'] ">Company Email</label>
                                    <div className="flex flex-col justify-center items-center">
                                        <Field className="border-0 h-11 w-[18rem] ml-[0.6rem] text-md px-2" type="email" id="orgEmail" name="orgEmail" value={props.data.orgEmail} onChange={props.handleChange}/>
                                    <div className="mr-[8.5rem] mt-1 text-[#fb2f2f]">
                                        <ErrorMessage name="orgEmail" />
                                    </div>
                                    </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-[15px] w-full">
                                <label htmlFor="address" className="text-gray-500 text-base font-medium font-['Satoshi'] w-[3.8rem]">Business Address</label>
                                <div className="flex flex-col justify-center items-center">
                                        <Field className="border-0 focus:border-0 h-10 w-[51.6rem] text-base px-2 ml-[1rem]" type="text" id="address" name="address" value={props.data.address} onChange={props.handleChange}/>
                                <div className="mr-[42rem] mt-1 text-[#fb2f2f]">
                                    <ErrorMessage name="address" />
                                </div>
                                </div>

                        </div>

                        <div className="flex items-center gap-[100px] w-full">
                            <div className="flex justify-center items-center gap-8">
                                <label htmlFor="state" className="text-gray-500 text-base font-medium font-['Satoshi'] ">State</label>
                                <div>
                                <Field className="border-0 w-[20rem] ml-[1.7rem] focus:border-0 h-10 text-base px-2" type="text" id="state" name="state" value={props.data.state} onChange={props.handleChange}/>
                                <div className="ml-[1rem] mt-1 text-[#fb2f2f]">
                                    <ErrorMessage name="state" />
                                </div>

                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-8">
                                <label htmlFor="pincode" className="text-gray-500 text-base font-medium font-['Satoshi']  mr-[1rem]">Pincode</label>
                                <div className="flex flex-col">
                                        <Field className="border-0 h-10 w-[19.2rem] px-2" type="text" id="pincode" name="pincode" value={props.data.pincode} onChange={props.handleChange}/>
                                        <div className=" ml-[1rem] mt-2 text-[#fb2f2f]">
                                            <ErrorMessage name="pincode" />
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center w-full">
                            <div className="flex items-center justify-center">
                                <label htmlFor="description" className="text-gray-500 text-base font-medium font-['Satoshi']">Description</label>
                                <div>
                                    <Field className="border-0 focus:border-0 h-[60px] w-[51.5rem] ml-[1rem] px-2" type="text" id="description" name="description" value={props.data.description} onChange={props.handleChange}/>
                                    <div className=" ml-[1rem] mt-2 text-[#fb2f2f]">
                                        <ErrorMessage name="description" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full gap-6 flex justify-between items-center">
                            <label htmlFor="logoUpload" className="w-[184px] h-11 px-6 py-2.5 rounded-[5px] border border-dotted border-gray-500 justify-start items-center gap-4 inline-flex cursor-pointer">
                                <div className="w-6 h-6 relative">
                                    <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-300">
                                        <Image src={updatelogo} alt="button" />
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-4 flex">
                                    <div className="text-gray-500 text-base font-bold font-['Satoshi']">Upload Logo</div>
                                </div>
                                <input id="logoUpload" type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>

                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default OrgDetailsSetup;
