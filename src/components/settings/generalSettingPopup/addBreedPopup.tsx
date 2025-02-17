import React, { useEffect,useState } from 'react';
import closeicon from "../../../assets/icons/inventory/closeIcon.svg";
import Image from "next/image";
import { useAppSelector } from '@/lib/hooks';
import delicon from "../../../assets/icons/settings/deleteicon.svg"
import axios from "axios";
import Select from 'react-select';
import Loading2 from "@/app/loading2"
import checkicon from "../../../assets/icons/finance/check.svg"
import addicon from "../../../assets/icons/settings/addicon.svg"
interface Species{
    id:string,
    name:string | string[],
}

const AddBreed = ({ onClose }: any) => {
    const appState = useAppSelector((state) => state.app);
    const [isSaving, setSaving] = useState(false);
    const [formData, setFormData] = useState<{ species: string; breeds: string[] }>({
        species: '',
        breeds: [''],
    });
    const [existingBreeds, setExistingBreeds] = useState<string[]>([]); 
    const [error, setError] = useState<string | null>(null);

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
        console.log(value);
        if (field === 'species') {
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                breeds: [''] 
            }));
        }
    };
    
    
    const handleAddInput = () => {
        setFormData((prevData) => ({
            ...prevData,
            breeds: [...prevData.breeds, ''], 
        }));
    };

    const handleDeleteInput = (index: number) => {
        setFormData((prevData) => {
            const newBreeds = [...prevData.breeds];
            newBreeds.splice(index, 1);
            return {
                ...prevData,
                breeds: newBreeds.length > 0 ? newBreeds : [''],
            };
        });
    };
    const handleBreedInputChange = (index: number, value: string) => {
        setFormData((prevData) => {
          const newBreeds = [...prevData.breeds];
          newBreeds[index] = value;
          return {
            ...prevData,
            breeds: newBreeds,
          };
        });
      };
      
    const [species, setSpecies] = useState<any[]>([]);
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/species/getAll?branchId=${appState.currentBranchId}`
                );
    
                const speciesList: any[] = response.data.map((speciesEntry: Species) => ({
                    value: speciesEntry.id,
                    label: speciesEntry.name 
                }));
                console.log(speciesList);
                setSpecies(speciesList);
            } catch (error) {
                console.log('Error fetching species', error);
            }
        };
    
        fetchSpecies();
    }, [appState.currentBranchId]);

    useEffect(() => {
        const fetchAllBreeds = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/getAll?branchId=${appState.currentBranchId}`);
                const breedsData = await response.json();
    
                // Filter breeds by the selected species
                const filteredBreeds = breedsData.filter((breed: { speciesId: string }) => breed.speciesId === formData.species);
                setExistingBreeds(filteredBreeds.flatMap((breed: { name: string[] }) => breed.name)); // Flatten the breed names
            } catch (error) {
                console.log('Error fetching breeds', error);
            }
        };
    
        if (formData.species) {
            fetchAllBreeds();
        }
    }, [formData.species, appState.currentBranchId]);

    const handleSave = async () => {
        const trimmedBreeds = formData.breeds.map((breed) => breed.trim());
        const allExistingItems = [...existingBreeds];
        console.log("exis ting breed : ",allExistingItems);
        console.log("trimmed breed : ", trimmedBreeds);
        const duplicates = trimmedBreeds.filter(
          (breed, index) =>
            breed && (trimmedBreeds.indexOf(breed) !== index || existingBreeds.includes(breed))
        );
    
        if (duplicates.length > 0 || trimmedBreeds.some((breed) => !breed)) {
          setError(
            duplicates.length > 0
              ? `${duplicates.join(', ')} already exists.`
              : 'Please fill out all breed fields.'
          );
          return;
        }
    
        setError(null);
    
        try {
          setSaving(true);
          const requestBody = {
            speciesId: formData.species,
            name: trimmedBreeds,
          };
    
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/settings/breed/create?branchId=${appState.currentBranchId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            }
          );
    
          if (response.ok) {
            console.log('Breed Data saved successfully', response);
            onClose();
            window.dispatchEvent(new FocusEvent('focus'));
          } else {
            console.error('Failed to save data:', response.statusText);
          }
        } catch (error) {
          console.error('Error while saving data:', error);
        } finally {
          setSaving(false);
        }
      };
      



      return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 inset-0 backdrop-blur-sm bg-gray-200 bg-opacity-50 z-50">
          <div className="w-[640px] max-h-[450px] p-8 bg-gray-100 rounded-[20px] shadow border border-neutral-400 border-opacity-60 backdrop-blur-[60px] flex-col justify-start items-start gap-6 flex overflow-y-auto">
            <div className="self-end items-start gap-6 flex cursor-pointer" onClick={onClose}>
              <Image src={closeicon} alt="close"></Image>
            </div>
            <div className="flex-col justify-start items-start gap-2 flex w-full">
              <div className="text-gray-500 text-xl font-medium">Add Breeds</div>
              <div className="w-full flex justify-between">
                <div className="text-neutral-400 text-base font-medium">Add and configure your breeds</div>
              </div>
            </div>
            <div className="w-full flex items-center gap-[6rem]">
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex items-center">
                  <div className="text-gray-500 text-base font-medium w-[12rem]">Species</div>
                  <Select
                    className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base focus:border focus:border-solid focus:border-textGreen"
                    placeholder="Select Species"
                    isClearable={false}
                    isSearchable={true}
                    options={species}
                    isMulti={false}
                    name="species"
                    onChange={(e) => handleChange('species', e?.value)}
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-[6rem]">
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-col gap-3">
                  {formData.breeds.map((breed, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-gray-500 text-base font-medium w-[12rem]">Breeds</div>
                      <input
                        className="ml-[5rem] w-[80%] border border-solid border-borderGrey outline-none h-11 rounded-md text-textGrey2 font-medium text-base px-2"
                        type="text"
                        value={breed}
                        onChange={(e) => handleBreedInputChange(index, e.target.value)}
                      />
                      <div
                        className="ml-2 h-11 px-[0.6rem] rounded-[5px] justify-start items-center flex bg-black cursor-pointer"
                        onClick={() => handleDeleteInput(index)}
                      >
                        <Image src={delicon} alt="delete"></Image>
                      </div>
                    </div>
                  ))}
                  {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between mt-[5px]">
              <div
                className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex cursor-pointer"
                onClick={handleAddInput}
              >
                <Image className="w-6 h-6 relative rounded-[5px]" src={addicon} alt="preview" />
                <div className="text-white text-base font-bold">Add Another</div>
              </div>
              <button
                className="px-5 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex outline-none border-none cursor-pointer"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Image src={checkicon} alt="check"></Image>
                <div className="text-white text-base font-bold">
                  {isSaving ? <Loading2 /> : 'Save'}
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default AddBreed;