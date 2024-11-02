import { useEffect, useMemo, useState } from "react"

let interval: NodeJS.Timeout

export const useTimer = (startTime: number, type: 'up' | 'down' = 'down') => {
    const [currTime, setCurrTime] = useState(startTime)

    const hms = useMemo(() => {
        if (currTime > 0) {
            const hours = Math.floor(currTime / 3600000);
            const minutes = Math.floor((currTime % 3600000) / 60000);
            const seconds = Math.floor((currTime % 60000) / 1000);
            return {
                h: hours < 10 ? '0' + hours : hours,
                m: minutes < 10 ? '0' + minutes : minutes,
                s: seconds < 10 ? '0' + seconds : seconds
            }
        }

        return {
            h: '00',
            m: '00',
            s: '00'
        }
    }, [currTime])

    const ms = useMemo(() => {
        if (currTime > 0) {
            const minutes = Math.floor(currTime / 60000);
            const seconds = Math.floor((currTime % 60000) / 1000);

            return {
                m: minutes < 10 ? '0' + minutes : minutes,
                s: seconds < 10 ? '0' + seconds : seconds
            }
        }

        return {
            m: '00',
            s: '00'
        }
    }, [currTime])

    const dhms = useMemo(() => {
        if (currTime > 0) {
            let milliseconds = currTime

            const days = Math.floor(milliseconds / 86400000);
            milliseconds %= 86400000;
            const hours = Math.floor(milliseconds / 3600000);
            milliseconds %= 3600000;
            const minutes = Math.floor(milliseconds / 60000);
            milliseconds %= 60000;
            const seconds = Math.floor(milliseconds / 1000);

            return {
                d: days < 10 ? `0${days}` : days,
                h: hours < 10 ? `0${hours}` : hours,
                m: minutes < 10 ? `0${minutes}` : minutes,
                s: seconds < 10 ? `0${seconds}` : seconds,
            }
        }

        return {
            d: '00',
            h: '00',
            m: '00',
            s: '00'
        }
        // return '00 Days : 00 Hr : 00 Min : 00 Sec'
    }, [currTime])

    useEffect(() => {
        interval = setInterval(() => {
            if (type === 'down') {
                if (currTime > 1000) {
                    setCurrTime(prevState => prevState - 1000)
                } else {
                    setCurrTime(0)
                    clearInterval(interval)
                }
            } else {
                setCurrTime(prevState => prevState + 1000)
            }
        }, 1000)
    }, [startTime, type])

    return {
        hms,
        ms,
        dhms,
    }
}