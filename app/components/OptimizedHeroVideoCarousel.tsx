"use client";

import { useEffect, useState, useRef } from "react";

const videoSources = ["/hero1.mp4", "/run.mp4", "/hero2.mp4", "/hero3.mp4"];

export default function OptimizedHeroVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Handle video switching and playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(e => console.log("Video play failed:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  // Carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleVideoLoad = (index: number) => {
    setIsVideoReady(true);
  };

  return (
    <div className="absolute inset-0">
      {/* Videos with lazy loading */}
      {videoSources.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Video element */}
          <video
            ref={el => videoRefs.current[index] = el}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => handleVideoLoad(index)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Loading skeleton for first load */}
      {!isVideoReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse z-0" />
      )}
    </div>
  );
}