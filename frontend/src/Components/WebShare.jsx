import { Button } from '@headlessui/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FaShare } from 'react-icons/fa';


export const handleShare = async (title, id) => {
    const shareData = {
      title,
      text: `Watch '${title}' at StreamGrid`,
    //   url: 'https://streamgrid.stream/watch/' + id,
    };
  
    if (!navigator.share) {
      toast.error('Web Share is not supported in this browser');
      return;
    }
  
    try {
      if (navigator.canShare && !navigator.canShare(shareData)) {
        toast.error('Cannot share this content from this device');
        return;
      }
  
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Sharing failed: ' + err.message);
      }
    }
  };
  



const WebShare = ({ title, id }) => {


    return (
        <Button
            onClick={() => handleShare(title, id)}
            className="relative select-none outline-none transition-colors focus:bg-dry data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-3 w-full py-2 gap-2 flex items-center rounded-lg hover:bg-dry cursor-pointer mb-[.1rem] text-white hover:!bg-white/10"
        >
            <FaShare className="text-sm" />
            <span>Share</span>
        </Button>


    );
};

export default WebShare;
