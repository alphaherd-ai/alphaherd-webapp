import React, { useEffect,useState } from 'react';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import delicon from "../../../assets/icons/settings/deleteicon.svg"
import axios from "axios";
import Select from 'react-select';

interface Species{
    id:string,
    name:string | string[],
}

const AddBreed = ({ onClose }: any) => {
    const appState = useAppSelector((state) => state.app);

    const [formData, setFormData] = useState<any>("");
    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          border: state.isFocused ? '1px solid #35BEB1' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4', 
            },
          boxShadow: state.isFocused ? 'none' : 'none',
        }),
        valueContainer: (provided: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
        }),
        singleValue: (provided: any, state: any) => ({
          ...provided,
          width: '100%',
          maxWidth: '100%',
          color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '100%',
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#35BEB1' : 'white',
          color: state.isFocused ? 'white' : '#6B7E7D',
          '&:hover': {
            backgroundColor: '#35BEB1',
            color: 'white',
          },
        }),
    };


    const handleChange = (field: string, value: any) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [field]: value,
        }));
        if (field === 'species') {
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                breeds: [] 
            }));
        }
    };
    
    
    const handleDeleteInput = (index: number) => {
        const newInputs = [...formData];
        newInputs.splice(index, 1);
        setFormData(newInputs);
    };

    const handleSave = async () => {
        try {
            console.log('Form Data before saving:', formData);
            

                // Ensure we're using the correct species object which includes the id
                const species = formData.species; // should be the selected species object

                // Check if breeds is not empty
                const breedsArray = Array.isArray(formData.breeds) ? formData.breeds : [formData.breeds];

                // Ensure we have both species and breeds
                if (!species || !breedsArray.length) {
                    console.error('Species and breeds must be provided');
                    return;
                }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/create?branchId=${appState.currentBranchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    species: {
                        connect: { id: species.value }, // Pass the species id
                    },
                    name: breedsArray, 
                }),
            });
            if (response.ok) {
                console.log('Breed Data saved successfully',response);
                onClose();
                window.dispatchEvent(new FocusEvent('focus'));
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    }

    const [species, setSpecies] = useState<any[]>([]);
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/getAll?branchId=${appState.currentBranchId}`
                );
    
                const speciesList: any[] = response.data.reduce((acc: any[], speciesEntry: Species) => {
                    if (Array.isArray(speciesEntry.name)) {
                        speciesEntry.name.forEach((name: string) => {
                            acc.push({ value: speciesEntry.id, label: name });
                        });
                    } else {
                        acc.push({ value: speciesEntry.id, label: speciesEntry.name });
                    }
                    return acc;
                }, []);
    
                console.log(speciesList);
                setSpecies(speciesList);
            } catch (error) {
                console.log('Error fetching species', error);
            }
        };
    
        fetchSpecies();
    }, [appState.currentBranchId]);
    

    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
            <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
                <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
                    <Image src={closeicon} alt="close"></Image>
                </div>
                <div className="flex-col justify-start items-start gap-2 flex w-full">
                    <div className="text-gray-500 text-xl font-medium">Add Breeds</div>
                    <div className='w-full flex justify-between '>
                        <div className="text-neutral-400 text-base font-medium">Add and configure your breeds</div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col  gap-3'>

                            <div  className="w-full flex  items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Species</div>
                                <Select
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    placeholder="Select Species"
                                    isClearable={false}
                                    isSearchable={true}
                                    options={species}
                                    isMulti={false}
                                    name="species"
                                    onChange={(e) => handleChange("species", e)} 
                                    styles={customStyles}
                                />
                               
                            </div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-[6rem] ">
                    <div className='w-full flex flex-col  gap-3'>

                            <div  className="w-full flex  items-center">
                                <div className="text-gray-500 text-base font-medium w-[12rem]">Breeds</div>
                                <input
                                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen px-2"
                                    type="text"
                                    name="breeds"
                                    onChange={(e) => handleChange("breeds", e.target.value.split(','))}
                                />
                                {/* <div className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer" onClick={() => handleDeleteInput(index)}>
                                    <Image src={delicon} alt="delete"></Image>
                                </div> */}
                               
                            </div>
                    </div>
                </div>
                <div className="w-full flex justify-between mt-[5px] cursor-pointer">
                    <button className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer" onClick={handleSave}>
                        <div className="text-white text-base font-bold ">Save</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddBreed;