import React from 'react'
import { useNotification } from './NotificationContext';
import { UnsupportedNotificationMessage } from './UnsupportedNotificationMessage.jsx';
import NotificationSubscriptionStatus from './NotificationSubscriptionStatus.jsx';
import { NotificationSubscriptionForm } from './NotificationSubscriptionForm.jsx';

const PushNotification = () => {
    const {isSupported, isSubscribed} = useNotification();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100dvh)] bg-gray-100 p-4">
            {!isSupported ? (
                <UnsupportedNotificationMessage/>
            ) : (
                <NotificationSubscriptionStatus/>
            )}

            {isSubscribed && (
                <NotificationSubscriptionForm/>
            )}
        </div>
    );
};

export default PushNotification
