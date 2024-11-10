import { TimeStamp } from "../types";

export function formatTime(ms: TimeStamp) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours} h`;
    } else if (minutes > 0) {
        return `${minutes} min`;
    } else {
        return `${seconds} sec`;
    }
}

export function formatDate(ms: TimeStamp) {
    const monthNames = [
        "January", "February", "March", "April", 
        "May", "June", "July", "August", 
        "September", "October", "November", "December"
    ];


    const month = monthNames[new Date(ms).getMonth()]
    const day = new Date(ms).getDate()
    const year = new Date(ms).getFullYear()

    return `${month} ${day}, ${year}`
}