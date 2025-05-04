const SERVICE_WORKER_FILE_PATH = "./notification-sw.js";

export function isNotificationSupported() {
    let unsupported = false;
    if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("showNotification" in ServiceWorkerRegistration.prototype)
    ) {
        unsupported = true;
    }
    return !unsupported;
}

export function isPermissionGranted() {
    return Notification.permission === "granted";
}

export function isPermissionDenied() {
    return Notification.permission === "denied";
}

export async function registerAndSubscribe(onSubscribe,
                                           onError) {
    try {
        await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
        //subscribe to notification
        navigator.serviceWorker.ready
            .then((registration) => {
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_PUBLIC_KEY,
                });
            })
            .then((subscription) => {
                console.info("Created subscription Object: ", subscription.toJSON());
                onSubscribe(subscription);
            })
            .catch((e) => {
                onError(e);
            });
    } catch (e) {
        onError(e);
    }
}