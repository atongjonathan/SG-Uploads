import {
    isNotificationSupported,
    isPermissionDenied,
    isPermissionGranted,
    registerAndSubscribe
} from "./NotificationPush";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";


const NotificationContext = createContext(undefined);

export const NotificationProvider = ({children}) => {
    const [isSupported, setIsSupported] = useState(false);
    const [isGranted, setIsGranted] = useState(false);
    const [isDenied, setIsDenied] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (isNotificationSupported()) {
            setIsSupported(true);
            const granted = isPermissionGranted();
            setIsGranted(granted);
            setIsDenied(isPermissionDenied());
            if (granted) {
                handleSubscribe();
            }
        }
    }, []);

    const handleSubscribe = () => {
        const onSubscribe = (subscription) => {
            if (subscription) {
                // for a production app, you would probably have a user account and save the subscription to the user
                // make http request to save the subscription
                setIsSubscribed(true);
                setSubscription(subscription);
            }
            setIsGranted(isPermissionGranted());
            setIsDenied(isPermissionDenied());
        };
        const onError = (e) => {
            console.error("Failed to subscribe cause of: ", e);
            setIsGranted(isPermissionGranted());
            setIsDenied(isPermissionDenied());
            setIsSubscribed(false);
            setErrorMessage(e?.message);
        }
        registerAndSubscribe(onSubscribe, onError);
    };

    const contextValue = useMemo(
        () => ({
            isSupported,
            isSubscribed,
            isGranted,
            isDenied,
            subscription,
            errorMessage,
            handleSubscribe,
        }),
        [isSupported, isSubscribed, isGranted, isDenied, subscription, errorMessage]
    );

    return (
        <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
