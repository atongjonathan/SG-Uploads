import { Button } from '@headlessui/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FaShare } from 'react-icons/fa';

const WebShare = ({ title, id }) => {

    const shareData = {
        title,
        text: `Watch '${title}' at StreamGrid`,
        url: 'https://streamgrid.stream/watch/' + id,
    };

    const handleShare = async () => {
        if (!navigator.canShare) {
            return;
        }
        if (!navigator.canShare(shareData)) {
            toast.error('Share data unsupported, disallowed, or invalid');
            return;
        }

        try {
            await navigator.share(shareData);
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    return (
        <Button onClick={handleShare} className="relative select-none outline-none transition-colors focus:bg-dry data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-3 w-full py-2 gap-2 flex items-center rounded-lg hover:bg-dry cursor-pointer mb-[.1rem] text-white hover:!bg-white/10">
            <FaShare />
            Share
        </Button>

    );
};

export default WebShare;
