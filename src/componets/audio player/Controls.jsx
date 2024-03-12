import React, { useCallback, useEffect, useRef, useState } from 'react'

// icons
import { MdPauseCircle } from "react-icons/md";
import { IoMdPlayCircle } from "react-icons/io";
import { 
        TbRewindBackward10,
        TbRewindForward10 
} from "react-icons/tb";

function Controls({ 
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress, 
}) {

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };


    const playAnimationRef = useRef();


    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );
        playAnimationRef.current = requestAnimationFrame(repeat);
        
    }, [audioRef, duration, progressBarRef, setTimeProgress]);


    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);


    const skipForward = () => {
        audioRef.current.currentTime += 10;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 10;
    };


      

    return (
        <div className="controls-wrapper">
            <div className="controls">
                
                <button className='controls-time' onClick={skipBackward}>
                    <TbRewindBackward10 />
                </button>

                <button className='controls-resume' onClick={togglePlayPause}>
                    {isPlaying ? <MdPauseCircle /> : <IoMdPlayCircle />}
                </button>

                <button className='controls-time' onClick={skipForward}>
                    <TbRewindForward10 />
                </button>
                
            </div>
        </div>
    );
}

export default Controls