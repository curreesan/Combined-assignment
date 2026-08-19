// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

const pad = (num) => String(num).padStart(2, '0');

const printClock = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const time24 = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const time12 = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${period}`;

    console.log(time24, '|', time12);
};

setInterval(printClock, 1000);
