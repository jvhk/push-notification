const publicVapidKey = 'BDlY4vCbqI-eaYZ__VcVB67Z4e4kQA26w64CoMRpRdRXYY9KYQI92zqOKD_TBKXUYcmvON6mhHmKWhwpnNh6OXY';


//check for the service worker
if('service-worker' in navigator){  //navigator -> API for the browser self
    send().catch(err => console.error(err));
}

// register Service worker, register Push, send the Push
async function send(){
    console.log('Registering service worker..');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    console.log('Serice worker Registered!');

    //Register Push 
    console.log('Registering Push..');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered!');

    // Send Push notification
    console.log('Sending Push notification..');
    await fetch('/subscribe', {
        method: 'POST',
        body:JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent succesfully!');
}

function urlBase64ToUint8Array(base64String){
    const padding = '=' .repeat((4-base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

