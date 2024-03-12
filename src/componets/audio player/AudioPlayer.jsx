import React, { useRef, useState } from 'react'


// import components
import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar'


function AudioPlayer({bookSummary}) {
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    

    const audioRef = useRef();
    const progressBarRef = useRef();

  
    return (
    <div className='audio-player'>
        <div className='inner'>
            <DisplayTrack {...{audioRef, setDuration, progressBarRef, bookSummary}}/>                   
            <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, }}/>
            <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }}/>
        </div>
    </div>
  )
}

export default AudioPlayer