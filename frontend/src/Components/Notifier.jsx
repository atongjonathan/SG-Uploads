import React, { useEffect, useState } from 'react';

const Notifier = ({ movies }) => {
    const [db, setDb] = useState(null);

    // Optionally delete the database manually for dev/testing
    const deleteDatabase = () => {
        const deleteRequest = indexedDB.deleteDatabase('StreamGrid');

        deleteRequest.onsuccess = () => {
            console.log('Database deleted successfully');
        };

        deleteRequest.onerror = (event) => {
            console.error('Error deleting database:', event.target.error);
        };

        deleteRequest.onblocked = () => {
            console.warn('The database deletion is blocked. Please close all other tabs that are using the database.');
        };
    };

    useEffect(() => {
        const DBOpenRequest = window.indexedDB.open('StreamGrid', 2);

        DBOpenRequest.onerror = () => {
            console.log('Error loading database.');
        };

        DBOpenRequest.onsuccess = (event) => {
            const database = event.target.result;
            setDb(database);
            console.log('Database initialized.');
        };

        DBOpenRequest.onupgradeneeded = (event) => {
            const database = event.target.result;

            if (!database.objectStoreNames.contains('Notifications')) {
                const objectStore = database.createObjectStore('Notifications', {
                    keyPath: 'notificationTitle',
                });

                objectStore.createIndex('title', 'title', { unique: false });
                objectStore.createIndex('description', 'description', { unique: false });
                objectStore.createIndex('notified', 'notified', { unique: false });
                objectStore.createIndex('image', 'image', { unique: false });
                objectStore.createIndex('url', 'url', { unique: false });
            }
        };
    }, []);

    useEffect(() => {
        if (!db || !movies || movies.length === 0) return;

        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications.');
            return;
        }

        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        const transaction = db.transaction(['Notifications'], 'readwrite');
        const store = transaction.objectStore('Notifications');

        movies.forEach((movie) => {
            const key = `Movie: ${movie.title}`;
            const getReq = store.get(key);

            getReq.onsuccess = () => {
                const exists = getReq.result;
                if (!exists) {
                    const newItem = {
                        notificationTitle: key,
                        title: `🎬 New on StreamGrid: ${movie.title}`,
                        description: `Check out "${movie.title}", now trending on StreamGrid!`,
                        image: movie.poster || '/logo.png',
                        url: movie.url || window.location.origin + "/watch/" + movie.id,
                        notified: 'no',
                    };
                    store.put(newItem);
                }
            };
        });

        transaction.oncomplete = () => {
            const notifyTx = db.transaction(['Notifications'], 'readwrite');
            const notifyStore = notifyTx.objectStore('Notifications');
            const index = notifyStore.index('notified');
            const req = index.getAll('no');

            req.onsuccess = () => {
                const unnotified = req.result;
                const maxNotifications = 1;
                const notificationsToNotify = unnotified.slice(0, maxNotifications);

                if (notificationsToNotify.length > 0) {
                    let item = notificationsToNotify[0]
                    const notification = new Notification(item.title, {
                        body: item.description,
                        icon: item.image,
                    });

                    notification.onclick = () => {
                        window.open(item.url, '_blank');
                    };

                    item.notified = 'yes';
                    notifyStore.put(item);
                }



            };
        };
    }, [db, movies]);

    return (
        <>
        </>
        // <button
        //     onClick={deleteDatabase}
        //     style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}
        // >
        //     Delete DB (Dev Only)
        // </button>
    );
};

export default Notifier;
