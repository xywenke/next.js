"use client"

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

import styles from './main.module.css'

function WaveformSurfer({ src, time=0, widthzoom=20, style={} }) {

    console.log('waveform surfer component: ', style)

    const containerRef = useRef(null)
    const wavesurfer = useRef(null)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (!src) return 

        const ws = WaveSurfer.create({
            container: containerRef.current,
            interact: false,
            waveColor: '#3366ff',
            progressColor: '#ff0066',
            cursorColor: 'red',
            height: 300,
            barWidth: 1,
        })
        ws.load(src)
        ws.on('ready', () => setDuration(ws.getDuration()))
        ws.on('play', () => setIsPlaying(true))
        ws.on('pause', () => setIsPlaying(false))
        wavesurfer.current = ws

        return () => ws.destroy()
    }, [src])

    useEffect(() => {
        const ws = wavesurfer.current
        // console.log('set time: ', time)
        ws.setTime(time)    
    }, [time, wavesurfer.current])

    // Format seconds to MM:SS
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handlePlayPause = () => {
        console.log('handle play and pause: ')
        // console.log('handle play and pause: ', time)
        isPlaying ?
            wavesurfer.current.pause()   
        :
            wavesurfer.current.play(time)   
    }

    return (
        <div style={style}>
            <div
                style={{
                    width: widthzoom*duration
                }}
                ref={containerRef} 
            />
            <div>
                <span>{src.split('/').pop()}</span>
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                <button
                    onClick={handlePlayPause}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}

WaveformSurfer.propTypes = {
    src: (props, propName) => {
        if (!props[propName]) {
            return new Error('`src` is required to load an audio file.')
        }
        if (typeof props[propName] !== 'string') {
            return new Error('`src` must be a string (path to .wav file).')
        }
    },
    time: (props, propName) => {
        if (typeof props[propName] !== 'number')
            return new Error(`'${propName}' must be a number, ${typeof props[propName]} reveived.`)
        if (props[propName] < 0)
            return new Error(`'${propName}' must be a number > 0`)
    },
    widthzoom: (props, propName) => {
        if (typeof props[propName] !== 'number')
            return new Error(`'${propName}' must be a number, ${typeof props[propName]} reveived.`)
        if (props[propName] < 0)
            return new Error(`'${propName}' must be a number > 0`)
    },
    style: (props, propName) => {
        if (typeof props[propName] !== 'object')
            return new Error(`'${propName}' must be object, ${typeof props[propName]} reveived.`)
    },
}
export default WaveformSurfer