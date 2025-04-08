import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react';
import { useQuery } from "@tanstack/react-query";
import { getMovies } from '../utils/Backend';
import { useLocation } from 'react-router-dom';
import Movie from '../Components/Movie';
import { FaAngleDown, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { Button } from '@headlessui/react';
import Skeleton from 'react-loading-skeleton';
import { SelectorIcon } from '@heroicons/react/solid';

const TanstackTable = () => {
    const defaultState = {
        pageIndex: 0,
        pageSize: 12,
    }
    const [pagination, setPagination] = useState(defaultState);
    const [category, setCategory] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("Any");
    const [selectedYear, setSelectedYear] = useState("Any");
    const [selectedSort, setSelectedSort] = useState("Any");
    const [ordering, setOrdering] = useState("-rating_star");



    // Build config based on pagination
    const config = {
        params: {
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
            genre: selectedGenre !== "Any" ? selectedGenre : null,
            year: selectedYear !== "Any" ? selectedYear : null,
            ordering
        },
    };

    console.log(config);




    const { data, isFetching } = useQuery({
        queryKey: ['moviesQuery', config, ordering],

        queryFn: async () => {
            const res = await getMovies(config);
            return res;
        },
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const totalPages = data?.count
        ? Math.ceil(data.count / pagination.pageSize)
        : 0;



    const canPreviousPage = pagination.pageIndex > 0;
    const canNextPage = pagination.pageIndex + 1 < totalPages;
    const startYear = 2000;
    const endYear = new Date().getFullYear();

    const years = Array(endYear - startYear + 1).fill().map((_, i) => startYear + i);
    years.reverse()
    const genres = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family",
        "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western", "Short"
    ];
    const sort = [
        {
            label: "Latest Release",
            value: "-releaseDate"
        },
        {
            label: "Old Release",
            value: "releaseDate"
        },
        {
            label: "Highest Rated",
            value: "-rating_star"
        },
        {
            label: "Lowest Rated",
            value: "rating_star"
        },
        {
            label: "Title Asc",
            value: "title"
        },
        {
            label: "Title Desc",
            value: "-title"
        }
    ]

    const sortValues = sort.map((value) => value.value)

    const orderIdx = sortValues.findIndex((value) => value == ordering)

    const filterSortLabel = sort[orderIdx].label




    const filters = [
        {
            value: selectedGenre,
            label: "Genre",
            onChange: setSelectedGenre,

            items: ["Any", ...genres]
        },
        {
            value: selectedYear,
            label: "Year",
            onChange: setSelectedYear,
            items: ["Any", ...years]
        },
        {
            value: ordering,
            label: "Sort By",
            onChange: setOrdering, // Only need to set selectedSort
            items: sort // Array of sorting options with value and label
        }


    ]
    useEffect(() => {
        const selected = sort.find(item => item.label === selectedSort);
        setOrdering(selected?.value ?? "-rating_star");
    }, [selectedSort]);

    return (
        <div className="min-height-screen container mx-auto p-4 mt-3">
            <div className="w-full flex justify-between">
                <div className="flex sm:gap-3 gap-2 items-center truncate">
                    <h2 className="text-sm font-semibold truncate">Movies</h2>
                </div>


                <div className="px-2 flex justify-center gap-2">
                    <Button
                        onClick={() => setPagination(prev => ({
                            ...prev,
                            pageIndex: Math.max(prev.pageIndex - 1, 0)
                        }))}
                        disabled={!canPreviousPage}
                        className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${!canPreviousPage ? "bg-dry" : "bg-subMain active:bg-dry"
                            }`}
                    >
                        <FaArrowLeft />
                    </Button>
                    <Button
                        onClick={() => setPagination(prev => ({
                            ...prev,
                            pageIndex: prev.pageIndex + 1
                        }))}
                        disabled={!canNextPage}
                        className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${!canNextPage ? "bg-dry" : "bg-subMain active:bg-dry"
                            }`}
                    >
                        <FaArrowRight />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-3 pt-3 items-end">
                <div className='text-dryGray border-gray-800 grid grid-cols-3 lg:gap-12 gap-2 rounded p-3 col-span-4'>
                    {
                        filters.map((filter, i) => (
                            <Field key={i} className={"flex flex-col gap-2"}>
                                <Label className={"uppercase text-sm"}>
                                    {filter.label}</Label>
                                <Listbox value={Object.keys(sort).find((item) => item === filter.value)} onChange={filter.onChange}>
                                    <div className="relative">
                                        <ListboxButton className='relative border border-gray-800 w-full text-white bg-dry rounded-lg cursor-default py-2 px-3 text-left text-xs'>
                                            <span className='block truncate'>{filter.label === "Sort By" ? filterSortLabel : filter.value}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                                                <FaAngleDown className='h-4 w-4' aria-hidden='true' />
                                            </span>
                                        </ListboxButton>
                                        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                                            <ListboxOptions className='absolute z-10 mt-1 w-full bg-dry border border-gray-800 text-white rounded-md shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm'>
                                                {filter.items.map((item, idx) => {
                                                    const isObject = typeof item === 'object' && item !== null;
                                                    const value = isObject ? item.value : item;
                                                    const label = isObject ? item.label : item;

                                                    return (
                                                        <ListboxOption
                                                            key={idx}
                                                            value={value}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-1 pl-8 pr-4 ${active ? "bg-subMain" : "bg-main"
                                                                } text-white transitions rounded`
                                                            }
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate text-xs ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                                        {label}
                                                                    </span>
                                                                    {selected && (
                                                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                                                            <FaCheck className='h-3 w-3' aria-hidden='true' />
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </ListboxOption>
                                                    );
                                                })}

                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </Field>

                        ))
                    }


                </div>
                <Button
                    onClick={() => {
                        setSelectedGenre("Any");
                        setSelectedYear("Any");
                        setSelectedSort("Any");
                        setOrdering("-rating_star");
                        setPagination(defaultState);
                    }}
                    className="h-10 mb-3 flex-rows grid-cols-1 gap-3 text-white px-4 py-3 rounded border-2 border-subMain mr-2 hover:bg-subMain hover:border-main transitions text-sm"
                >
                    Reset
                </Button>

            </div>

            <div className="grid mt-3 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-2 overflow-hidden">
                {isFetching ? (

                    [...Array(pagination.pageSize)].map((_, i) => (
                        <Skeleton
                            key={i}
                            baseColor="rgb(11 15 41)"
                            height={200}
                            className="rounded-lg w-full"
                        />

                    ))
                ) : (
                    data?.results?.map((movie, idx) => (
                        <Movie key={idx} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TanstackTable;
