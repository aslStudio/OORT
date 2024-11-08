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
