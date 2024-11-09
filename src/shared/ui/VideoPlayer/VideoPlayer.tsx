import React, { useState } from "react"
import ReactPlayer from 'react-player'

import { PropsDefault } from "@/shared/lib/types"

import styles from './VideoPlayer.module.scss'
import { TransitionFade } from "../TransitionFade"
import { IconImage } from "../IconImage"

export type VideoPlayerProps = PropsDefault<{
    src: string
}>

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    className,
    src
}) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const classes = [
        className ? className : '',
        styles.root,
    ].join(' ').trim()

    return (
        <div
            className={classes}
            onClick={() => {
                setIsPlaying(prevState => !prevState)
            }}
        >
            <ReactPlayer 
                url={src}
                playing={isPlaying}
                playsinline={true}
                controls={false}
                width='100%'
                height='100%'
                onEnded={() => {
                    setIsPlaying(false)
                }}
            />
            <TransitionFade 
                className={styles['play-button']}
            >
                {!isPlaying && (
                    <button key={'button'}>
                        <IconImage 
                            name={'play'}
                            size={40}
                        />
                    </button>
                )}
            </TransitionFade>
        </div>
    )
}