'use client';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import OverlaySection from '../common/overlay-section';
import PlaySVG from '@app/_components/svgs/guest/tour/play';

const TourVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play video and set state to playing
  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Pause event to update state when the video is paused
  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className={'bg-guestLinear'} />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto minHeightSection text-center flex flex-col items-center',
          'py-sectionPadding',
        )}>
        <div className="relative rounded-[32px] overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            onClick={handlePlay}
            onPlay={handlePlay}
            onPause={handlePause}
            className="w-full"
            controls={isPlaying} // Show controls only when playing
          >
            <source src="/videos/tour/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <button
              className="w-[100%] absolute h-[100%] left-0 top-0 bg-black/60 flex items-center justify-center"
              onClick={handlePlay}>
              <div className="w-[144px] h-[144px] rounded-full bg-goldLinear flex items-center justify-center">
                <PlaySVG />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourVideo;

