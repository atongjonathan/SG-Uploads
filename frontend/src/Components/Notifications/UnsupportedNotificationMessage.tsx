import React from "react";

export const UnsupportedNotificationMessage = () => {
    return (
        <div className="p-6 w-full max-w-md">
            <p className="text-red-500 text-center mb-6">Push notifications are not supported in this browser.
                Consider adding to the home screen (PWA) if on iOS.</p>
            
        </div>
    );
};