import React, { useCallback, useMemo, useRef, useState } from "react"

import { TransitionFade } from "../TransitionFade"

import styles from './AudioRecorder.module.scss'
import { ButtonIcon } from "../ButtonIcon"
import { Button } from "../Button"
import { PropsDefault } from "@/shared/lib/types"

enum State {
    START,
    RECORD,
    RESULT,
}

export type AudioRecorderProps = PropsDefault<{
    isLoading: boolean
    onSubmit: (v: File) => void
    onStartRecorder: () => void
}>

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
    isLoading,
    onSubmit,
    onStartRecorder
}) => {
    const [state, setState] = useState<State>(State.START)
    const [isPlaing, setIsPlaing] = useState<boolean>(false)
    const [blob, setBlob] = useState<Blob | null>(null)
    const [url, setURL] = useState<string>('')

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const context = useRef<AudioContext | null>(null)
    const analyser = useRef<AnalyserNode | null>(null)
    const mediaElement = useRef<MediaStreamAudioSourceNode | null>(null)
    const mediaElementPlay = useRef<MediaElementAudioSourceNode | null>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const array = useRef<Uint8Array | null>(null)
    const isLoop = useRef<boolean>(true)

    const buttonClasses = useMemo(() => [
       styles['button-result'],
       state !== State.RESULT ? styles['is-hidden'] : ''
    ].join(' ').trim(), [state])

    function onStart() {
        context.current = new AudioContext()
        analyser.current = context.current!.createAnalyser()

        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(stream => {
                mediaElement.current = context.current!.createMediaStreamSource(stream)
                mediaElement.current.connect(analyser.current!)
                mediaRecorder.current = new MediaRecorder(stream)

                mediaRecorder.current.ondataavailable = handleDataAvailable

                setState(State.RECORD)
                mediaRecorder.current.start()
                isLoop.current = true
                loop()
            })
    }

    function handleDataAvailable({ data }: BlobEvent) {
        if (data.size > 0) {
            const newBlob = new Blob(
                [data],
                { type: 'audio/mp3' }
            )
            setBlob(newBlob)

            const url = URL.createObjectURL(newBlob)
            audioRef.current = new Audio(url)
            setURL(url)

            context.current = null
            analyser.current = null

            setState(State.RESULT)
        }
    }

    function onStop() {
        mediaRecorder.current?.stop()
        isLoop.current = false
        setBlob(blob)
        setState(State.RESULT)

        Array(40).fill(1).forEach((_, index) => {
            wrapperRef.current!.children[index].classList.remove(styles['is-active'])
            // @ts-ignore
            wrapperRef.current!.children[index].style.height = `7px`
            // @ts-ignore
            wrapperRef.current!.children[index].style.opacity = 1
        })
    }

    const onPlay = useCallback(() => {
        if (audioRef.current) {
            if (!context.current) {
                context.current = new AudioContext()
                analyser.current = context.current!.createAnalyser()

                mediaElementPlay.current = context.current.createMediaElementSource(audioRef.current)
                mediaElementPlay.current.disconnect()
            
                mediaElementPlay.current?.connect(analyser.current)
                analyser.current.connect(context.current!.destination)
            }
            
            if (isPlaing) {
                audioRef.current.pause()
                isLoop.current = false
                setIsPlaing(false)
            } else {
                try {
                    audioRef.current.play()
                    isLoop.current = true
                    audioRef.current.onended = () => {
                        isLoop.current = false
                        setIsPlaing(false)
                    }
                    loop()
                    setIsPlaing(true)
                } catch (error) {
                    console.error('Playback error:', error);
                }
            }
        }
    }, [url, isPlaing])

    function loop() {
        if (isLoop.current) {
            window.requestAnimationFrame(loop)
            if (wrapperRef.current) {
                array.current = new Uint8Array(analyser.current!.frequencyBinCount)
                analyser.current!.getByteFrequencyData(array.current)

                Array(40).fill(1).forEach((_, index) => {
                    wrapperRef.current!.children[index].classList.add(styles['is-active'])
                    // @ts-ignore
                    wrapperRef.current!.children[index].style.height = `${array.current[index] / 3}px`
                    // @ts-ignore
                    wrapperRef.current!.children[index].style.opacity = 0.008 * array.current[index] / 2
                })
            }
        } else {
            Array(40).fill(1).forEach((_, index) => {
                wrapperRef.current!.children[index].classList.remove(styles['is-active'])
                // @ts-ignore
                wrapperRef.current!.children[index].style.height = `${7}px`
                // @ts-ignore
                wrapperRef.current!.children[index].style.opacity = 1
            })
        }
    }

    function onRetake() {
        setState(State.RECORD)
        onStart()
    }

    function onSubmitClick() {
        if (blob) {
            const file = new File(
                [blob],
                'recorded-audio.mp3',
                {
                    type: 'audio/mp3'
                }
            )
            onSubmit(file)
        }
    }

    return (
        <TransitionFade>
            {state === State.START && (
                <Button
                    isWide={true}
                    onClick={() => {
                        onStart()
                        onStartRecorder()
                    }}
                >
                    Start Recording
                </Button>
            )}
            {(
                state === State.RECORD || 
                state === State.RESULT
            ) && (
                <div key={'State.RECORD'}>
                    <div
                        key={'State.RECORD'}
                        ref={wrapperRef}
                        className={styles.wrapper}
                    >
                        {Array(40).fill(1).map((_, key) => (
                            <div 
                                key={key}
                                className={styles.item}
                            />
                        ))}
                    </div>
                    <div className={styles.row}>
                        <Button
                            className={buttonClasses}
                            view={'surface'}
                            onClick={onRetake}
                        >
                            Retake
                        </Button>
                        <button 
                            className={[
                                styles.button,
                                state === State.RESULT ? styles['is-recorded'] : ''
                            ].join(' ').trim()}
                            onClick={onStop}
                        />
                        <ButtonIcon 
                            className={buttonClasses}
                            icon={'play'}
                            view={'flat'}
                            size={'l'}
                            radius={'rounded'}
                            onClick={onPlay}
                        />
                        <Button
                            className={buttonClasses}
                            view={'brand'}
                            isLoading={isLoading}
                            onClick={onSubmitClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </TransitionFade>
    )
}