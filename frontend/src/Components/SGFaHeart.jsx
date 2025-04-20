import React from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { Button, Checkbox, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { GoPlus, GoCheck } from "react-icons/go";
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked, MdOutlineBookmark, MdOutlineRemoveRedEye, MdOutlineStopCircle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../utils/Backend';
import { ImSpinner8 } from "react-icons/im";


const SGFaHeart = ({ movie }) => {

  let { user } = useAuth()

  const id = movie?.id
  const actions = [
    {
      Icon: MdOutlineBookmark,
      label: "Plan to Watch",
      name: "plan",
      enabled: user ? !(user?.plan?.findIndex((movie) => movie.id === id) === -1) : false
    },
    {
      Icon: MdOutlineStopCircle,
      name: "hold",
      label: "On Hold",
      enabled: user ? !(user?.hold?.findIndex((movie) => movie.id === id) === -1) : false

    },
    {
      Icon: IoMdClose,
      name: "dropped",
      label: "Dropped",
      enabled: user ? !(user?.dropped?.findIndex((movie) => movie.id === id) === -1) : false

    },
    {
      Icon: RiCheckDoubleFill,
      name: "finished",
      label: "Finished",
      enabled: user ? !(user?.finished?.findIndex((movie) => movie.id === id) === -1) : false

    }
  ]

  return movie && (
    <Popover className="aspect-square">
      <PopoverButton className="p-1 aspect-square rounded-full bg-subMain flex items-center justify-center text-sm" >
        {
          actions.findIndex((action) => action.enabled) === -1 ? <GoPlus className='w-7 h-7 transitions p-1' /> : <GoCheck className='w-7 h-7 transitions p-1' />
        }

      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="divide-y border-white divide-white/5 rounded-xl bg-main/70 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-30"
      >
        <div className="p-1">
          {
            actions.map((action, idx) => (
              <ActionItem key={idx} {...action} id={movie?.id} />
            ))
          }

        </div>
      </PopoverPanel>

    </Popover>
  );
};

export default SGFaHeart;

const ActionItem = ({ Icon, label, name, id, enabled }) => {
  const { authTokens, user, fetchUser } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateMe"],
    mutationFn: (data) => {
      delete data.image
      const { plan, hold, finished, dropped, favourites, ...trimmed_user } = user
      return updateUser(authTokens.access, { ...trimmed_user, ...data }).then(() => fetchUser(authTokens))
    }
  })


  return (

    <Button className="rounded-lg py-2 px-3 transition hover:bg-main/80 flex text-white text-sm items-between justify-between w-44" onClick={() => {
      if (user) {
        let curentItems = user[name].map((item) => item.id)
        if (curentItems.includes(id)) {
          curentItems = curentItems.filter((item) => item !== id)
        }
        else {
          curentItems.push(id)
        }
        mutate({
          [name + "_ids"]: curentItems
        })
      }
      else {
        toast.info("You need to Login to use this feature")
      }
    }}>
      <div className="flex justify-between gap-2 items-center">
        <Icon className="text-white" />
        <p className='text-sm'>{label}</p>
      </div>
      {
        isPending ? <ImSpinner8 className='animate-spin' /> : enabled ? <MdOutlineRadioButtonChecked /> : <MdOutlineRadioButtonUnchecked />
      }

    </Button>
  )
}
