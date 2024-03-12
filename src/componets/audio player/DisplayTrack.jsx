import React from 'react'

import { BsMusicNoteBeamed } from 'react-icons/bs';

function DisplayTrack({ 
  bookSummary, 
  audioRef, 
  setDuration, 
  progressBarRef, 
  }){

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds)
    progressBarRef.current.max = seconds;
  };
  
  
  return (
    <div>
      <audio
        src={bookSummary.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className="audio-info">
        <div className="audio-image">  
            {bookSummary.imageLink ? (
              <img src={bookSummary.imageLink} alt="audio avatar" />
            ) : (
              <div className="icon-wrapper">
                <span className="audio-icon">
                  <BsMusicNoteBeamed />
                </span>
              </div>
            )}
          </div>
        <div className="audio-text">
          <p className="audio-title">{bookSummary.title}</p>
          <p>{bookSummary.author}</p>
        </div>
      </div>
    </div>
  );
}

export default DisplayTrack