'use client'
import { useState, useEffect } from 'react'

import WaveformSurfer from '@/src/container/WaveformSurfer'
import CursorVerticalLine from '@/src/component/CursorVerticalLine'
import VerticalGridLine from '@/src/component/VerticalGridLine'

import styles from './page.module.css'

// console.log('styles', styles)

function WavAlign() {
    const [cursorX, setCursorX] = useState(0)
    const [widthzoom, setWidthZoom] = useState(40)
    const [voices, setVoices] = useState([])
    const [voiceIndex, setVoiceIndex] = useState(0)
    const [playtime, setPlayTime] = useState({ whole: 0, segment: { index: 0, time: 0}})

    // load voices data
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('data/wavalign/voices.json')
            setVoices(await res.json())
        }
        fetchData()
    }, [])

    // handle cursor vertical line
    useEffect(() => {
        const handleMove = e => setCursorX(Math.round(e.clientX))
        document.addEventListener('mousemove', handleMove)
        return () => {
            document.removeEventListener('mousemove', handleMove)
        }
    }, [])

    // adjust play time
    useEffect(() => {
        if (voices.length == 0) return
        const segmentVoices = voices[voiceIndex].segment
        const ignoreElement = new Set(['BUTTON', 'INPUT'])
        const handlePageClick = e => {
            console.log('adjust play time, voice index: ', e, e.target.nodeName, voiceIndex, voices)
            if (ignoreElement.has(e.target.nodeName)) return
            const tempCursorX = e.clientX
            let whole = tempCursorX / widthzoom
            let index = 0, time = 0
            // console.log('segment voices', segmentVoices)
            for (const [i, v] of segmentVoices.entries()) {
                // console.log('voice', i, v)
                // console.log('tempCursorX', tempCursorX, v.start*widthzoom, v.end*widthzoom)
                if (v.start * widthzoom <= tempCursorX && v.end * widthzoom >= tempCursorX) {
                    index = i
                    time = tempCursorX / widthzoom - v.start
                    break
                }
            }
            // console.log('segment seek: ', index, time)
            setPlayTime({
                whole,
                segment: { index, time }
            })
        }
        document.addEventListener('click', handlePageClick)
        return () => document.removeEventListener('click', handlePageClick)
    }, [voiceIndex, voices, widthzoom])

    const switchVoice = (type=1, e) => {
        event.stopPropagation()
        let tempVoiceIndex = voiceIndex + type
        if (tempVoiceIndex >= voices.length)
            tempVoiceIndex = 0
        else if (tempVoiceIndex < 0)
            tempVoiceIndex = voices.length - 1
        setVoiceIndex(tempVoiceIndex)
    }

    // console.log('voices', voiceIndex, voices)

    return (
        <main>
            <div className={styles.option}>
                <button
                    onClick={e => switchVoice(-1, e)}
                >Previous</button>
                <span>voice: {voiceIndex+1} / {voices.length}</span>
                <button
                    onClick={e => switchVoice(1, e)}
                >Next</button>
                <span>
                    <label>widthzoom: </label>
                    <input
                        defaultValue={widthzoom}
                        onChange={e => setWidthZoom(parseInt(e.target.value))}
                    />
                </span>
            </div>
            <VerticalGridLine />
            <CursorVerticalLine x={cursorX} />
            { voices.length == 0 ? 
                <p>loading...</p>
            :
                <>
                    <WaveformSurfer
                        widthzoom={widthzoom}
                        time={playtime.whole}
                        src={`/data/wavalign/whole/${voices[voiceIndex].whole}`}
                    />
                    <div style={{position: 'relative', minHeight: '340px'}}>
                        { voices[voiceIndex].segment.map((v, i) => (
                            <WaveformSurfer
                                style={{
                                    position: 'absolute',
                                    top: '0px',
                                    left: `${v['start']*widthzoom}px`
                                }}
                                widthzoom={widthzoom}
                                time={ i == playtime.segment.index ?
                                    playtime.segment.time
                                :
                                    0
                                }
                                key={`voice-segment-${i}`}
                                src={`/data/wavalign/segment/${v.file}`}
                            />
                        ))}
                    </div>
                </>
            }
        </main>
    )
}

export default WavAlign

