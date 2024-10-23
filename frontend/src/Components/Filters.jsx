import React, { Fragment, useEffect, useState } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const YearData = [
    { title: 'Sort by Year' },
    { title: '2024' },
    { title: '2023' },
    { title: '2022' },
    { title: '2021' },
    { title: '2020' },
    { title: '2019' },
    { title: '2018' },
];

const TimesData = [
    { title: 'Sort by Hours' },
    { title: '< 1' },
    { title: '< 1.5' },
    { title: '< 2' },
    { title: '< 2.5' },
    { title: '< 3' },
    { title: '< 3.5' },
];

const RatesData = [
    { title: 'Sort by Star Rates' },
    { title: '1' },
    { title: '2' },
    { title: '3' },
    { title: '4' },
    { title: '5' },
];





const Filters = ({ categories }) => {
    let CategoriesData = [
        {
            'title': 'Sort By Categories'
        }
    ]
    let allCategories = categories.map((genre) => ({
        title: genre
    }));
    CategoriesData = CategoriesData.concat(allCategories)

    const [category, setCategory] = useState(CategoriesData[0]); // Set default selection
    const [year, setYear] = useState(YearData[0]);
    const [times, setTimes] = useState(TimesData[0]);
    const [rates, setRates] = useState(RatesData[0]);
    const navigate = useNavigate()


    useEffect(() => {
        const params = `category=${category.title}&year=${year.title}&times=${times.title}&rates=${rates.title}`
        navigate(`/movies?${params}`)
    }, [category, year, times, rates])



    const Filter = [
        {
            value: category,
            onChange: setCategory,
            items: CategoriesData,
        },
        {
            value: year,
            onChange: setYear,
            items: YearData,
        },
        {
            value: times,
            onChange: setTimes,
            items: TimesData,
        },
        {
            value: rates,
            onChange: setRates,
            items: RatesData,
        },
    ];

    return (
        <>
        <div className="flex justify-end">
          <button
            onClick={() => {
                setYear(YearData[0])
                setCategory(CategoriesData[0])
                setTimes(TimesData[0])
                setRates(RatesData[0])
            }}
            className="flex-rows gap-3 text-white py-3 px-4 rounded border-2 border-subMain mr-2 hover:bg-subMain hover:border-main transitions"
          >
            Clear
          </button>
        </div>
        <div className='my-2 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6'>
            {Filter.map((item, idx) => (
                <Listbox key={idx} value={item.value} onChange={item.onChange}>
                    <div className="relative">
                        <ListboxButton className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs'>
                            <span className='block truncate'>{item.value.title}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                                <SelectorIcon className='h-4 w-4' aria-hidden='true' />
                            </span>
                        </ListboxButton>
                        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                            <ListboxOptions className='absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                {item.items.map((iterm, idx) => (
                                    <ListboxOption
                                        key={idx}
                                        value={iterm}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 
                                            ${active ? 'bg-subMain text-white' : 'text-main'}`
                                        }
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                    {iterm.title}
                                                </span>
                                                {selected && (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                                        <FaCheck className='h-3 w-3' aria-hidden='true' />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </div>
                </Listbox>
            ))}
        </div>
        </>
        
    );
};

export default Filters;
