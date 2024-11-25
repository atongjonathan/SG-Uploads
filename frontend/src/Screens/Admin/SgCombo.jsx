import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { FaAngleDown, } from 'react-icons/fa'



export default function SgCombo({ searchMovie, movies, findMovie }) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState('')



    const filteredmovies =
        query === ''
            ? movies
            : movies?.filter((movie) => {
                return movie.title.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <form className="relative w-full text-sm bg-dryGray rounded flex-btn gap-4">
            <Combobox value={selected} onChange={(value) => value != '' && findMovie(value)} onClose={() => setQuery('')}>
                <ComboboxInput
                    className={clsx(
                        'rounded-lg  py-1.5 pr-8 pl-3 font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-dryGray'
                    )}
                    displayValue={(movie) => movie?.imdb}
                    onChange={searchMovie} placeholder='Search movie name'
                ></ComboboxInput>
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <FaAngleDown className="size-4 fill-subMain group-data-[hover]:fill-black" />
                </ComboboxButton>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-white/5 bg-dry p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 data-[closed]:cursor-pointer'
                    )}
                >
                    {filteredmovies.map((movie) => (
                        <ComboboxOption
                            key={movie.id}
                            value={movie.imdb}
                            className="w-full group flex gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 cursor-pointer"
                        >
                            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                                <img src={movie.image} alt={movie.title} title={movie.title} className='h-full w-full object-cover' />
                            </div>
                            <div className="text-sm/6 text-white">{`${movie.title} (${movie.year})`}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </form>
    )
}