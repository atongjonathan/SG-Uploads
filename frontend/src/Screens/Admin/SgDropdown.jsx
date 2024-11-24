import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'



export default function SgDropdown({ subs, sendSubs }) {
    const selected = {
        release: '- Choose a suitable subtitle -'
    }

    return (
        <Field className='flex flex-col gap-2'>
            <Label>Subtitles</Label>

            <div className="relative w-full text-sm bg-dryGray rounded flex-btn gap-4">

                <Listbox value={selected} onChange={sendSubs}>
                    <ListboxButton
                        className={clsx(
                            'rounded-lg  py-1.5 pr-8 pl-3 font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-dryGray text-left'
                        )}
                    >
                        {selected.release}

                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom start"
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-dry p-1 empty:invisible z-40 [--anchor-gap:4px] sm:[--anchor-gap:8px]',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                    >
                        {subs.map((sub) => (
                            <ListboxOption
                                key={sub.id}
                                value={sub}
                                className="w-[var(--button-width)] group flex gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 cursor-pointer"
                            >
                                <div className="text-sm/6 text-white">{sub.release} ({sub.year})</div>
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">{sub.download_count} - {sub.language}</kbd>

                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>

            </div>
        </Field>

    )
}