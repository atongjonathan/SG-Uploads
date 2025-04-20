import React, { Fragment, useEffect, useState } from 'react';
import {
    Listbox,
    Transition,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Field,
    Label,
    Button,
    Input
} from '@headlessui/react';
import { useQuery } from "@tanstack/react-query";
import { getMovies } from '../utils/Backend';
import { useSearchParams } from 'react-router-dom';
import Movie from '../Components/Movie';
import { FaAngleDown, FaArrowLeft, FaArrowRight, FaCheck, FaSearch } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { FiFilter } from "react-icons/fi";

const TanstackTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageIndex = parseInt(searchParams.get("page") || "1", 10) - 1;
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
    const selectedGenre = searchParams.get("genre") || "Any";
    const selectedYear = searchParams.get("year") || "Any";
    const selectedSort = searchParams.get("sort") || "Highest Rated";
    const country = searchParams.get("country") || "Any";
    const title = searchParams.get("title") || "Any";

    const startYear = 2000;
    const endYear = new Date().getFullYear();
    const years = Array(endYear - startYear + 1).fill().map((_, i) => startYear + i).reverse();

    const genres = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family",
        "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western", "Short"
    ];

    const country_list = ["Afghanistan", "Albania", "Algeria", "United States", "Canada", "India", "United Kingdom", "Nigeria", "France", "Germany", "China", "Japan", "South Korea", "Australia", "Brazil", "South Africa", "Mexico", "Italy", "Spain", "Russia", "Turkey", "Egypt", "Argentina", "Indonesia", "Vietnam", "Thailand", "Kenya", "Ghana", "Pakistan", "Bangladesh", "Philippines", "Others"];

    const sortOptions = [
        { label: "Latest Release", value: "-releaseDate" },
        { label: "Old Release", value: "releaseDate" },
        { label: "Highest Rated", value: "-rating_star" },
        { label: "Lowest Rated", value: "rating_star" },
        { label: "Title Asc", value: "title" },
        { label: "Title Desc", value: "-title" }
    ];

    const ordering = sortOptions.find(opt => opt.label === selectedSort)?.value || "-rating_star";
    const orderLabel = selectedSort;

    const config = {
        params: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            genre: selectedGenre !== "Any" ? selectedGenre : null,
            year: selectedYear !== "Any" ? selectedYear : null,
            releaseLocation: country !== "Any" ? country : null,
            ordering,
            title: title !== "Any" ? title : null,
        },
    };

    const { data, isFetching } = useQuery({
        queryKey: ['moviesQuery', config],
        queryFn: async () => await getMovies(config),
        keepPreviousData: true,
        staleTime: Infinity,
    });

    const totalPages = data?.count ? Math.ceil(data.count / pageSize) : 0;
    const canPreviousPage = pageIndex > 0;
    const canNextPage = pageIndex + 1 < totalPages;

    const updateParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === "Any" || value === undefined) {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        if (key !== 'page') {
            newParams.set('page', "1");
        }
        setSearchParams(newParams);
    };

    const filters = [
        {
            value: selectedGenre,
            label: "Genre",
            onChange: (value) => updateParam("genre", value),
            items: ["Any", ...genres],
        },
        {
            value: selectedYear,
            label: "Year",
            onChange: (value) => updateParam("year", value),
            items: ["Any", ...years],
        },
        {
            value: orderLabel,
            label: "Sort By",
            onChange: (value) => updateParam("sort", value),
            items: sortOptions.map((s) => s.label),
        },
        {
            value: country,
            label: "Country",
            onChange: (value) => updateParam("country", value),
            items: ["Any", ...country_list],
        },
    ];

    const [display, setDisplay] = useState(false);


    return (
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="10" data-aos-offset="100" className="min-height-screen container flex flex-col mx-auto p-4 gap-2">

            <div className={`col-span-3 relative lg:hidden xl:hidden md:inline-block`}>
                <form
                    className="w-full text-sm bg-dryGray rounded flex-btn gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/movies?title=" + title)
                        // no need to navigate manually — already handled via searchParams
                    }}
                >
                    <button type="button" className="bg-subMain w-12 flex-colo h-8 rounded text-white">
                        <FaSearch />
                    </button>

                    <Input
                        type="text"
                        // value={query || ''}
                        placeholder="Search Movies"
                        className="font-medium placeholder:text-border text-sm w-full bg-transparent border-none px-2 text-black"
                        onInput={(e) => {
                            let value = e.target.value
                            updateParam("title", value ? value : "Any")
                        }}
                    />
                </form>

            </div>
            <div className="w-full flex justify-between bg-dry">
                <div className="flex sm:gap-3 gap-2 items-center truncate">
                    <h2 className="ml-3 text-sm font-semibold truncate">Movies</h2>
                </div>


                <div className="px-2 flex justify-center gap-2 items-center">
                    <Button onClick={() => setDisplay((prev) => !prev)}><FiFilter className='text-lg w-4 h-4' /></Button>
                    <p className='text-xs'>Page {pageIndex + 1}</p>
                    <Button
                        onClick={() => updateParam("page", pageIndex)}
                        disabled={!canPreviousPage}
                        className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${!canPreviousPage ? "bg-dry" : "bg-subMain active:bg-dry"}`}
                    >
                        <FaArrowLeft />
                    </Button>
                    <Button
                        onClick={() => updateParam("page", pageIndex + 2)}
                        disabled={!canNextPage}
                        className={`transition duration-100 ease-in text-sm rounded w-7 h-7 flex-colo text-white ${!canNextPage ? "bg-dry" : "bg-subMain active:bg-dry"}`}
                    >
                        <FaArrowRight />
                    </Button>
                </div>
            </div>

            <div className={`grid gap-3 items-end w-full origin-left transition-all duration-300 ease-linear 
    ${display ? 'opacity-100 max-h-[500px] visible pt-4' : 'opacity-0 max-h-0 invisible'} 
    overflow-hidden`}>
                <div className='text-dryGray border-gray-800 grid grid-cols-2 lg:grid-cols-4 lg:gap-12 gap-2 rounded p-3 '>
                    {filters.map((filter, i) => (
                        <Field key={i} className="flex flex-col gap-2">
                            <Label className="uppercase text-sm">{filter.label}</Label>
                            <Listbox value={filter.value} onChange={filter.onChange}>
                                <div className="relative">
                                    <ListboxButton className='relative border border-gray-800 w-full text-white bg-dry rounded-lg cursor-default py-2 px-3 text-left text-xs'>
                                        <span className='block truncate'>{filter.value}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                                            <FaAngleDown className='h-4 w-4' aria-hidden='true' />
                                        </span>
                                    </ListboxButton>
                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <ListboxOptions className='absolute z-20 mt-1 w-full bg-dry border border-gray-800 text-white rounded-md shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm'>
                                            {filter.items.map((item, idx) => (
                                                <ListboxOption
                                                    key={idx}
                                                    value={item}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-1 pl-8 pr-4 ${active ? "bg-subMain" : "bg-main"} text-white transitions rounded`
                                                    }
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className={`block truncate text-xs ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                                {item}
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
                        </Field>
                    ))}
                </div>


            </div>

            <div className="grid mt-3 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-2 overflow-hidden">
                {isFetching ? (
                    [...Array(pageSize)].map((_, i) => (
                        <Skeleton
                            key={i}
                            baseColor="rgb(11 15 41)"
                            className="rounded-lg w-full aspect-[216/319]"
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
