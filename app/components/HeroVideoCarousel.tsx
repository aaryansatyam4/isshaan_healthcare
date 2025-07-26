"use client";

import { useEffect, useState } from "react"

const videoSources = ["/hero1.mp4","/run.mp4","/hero2.mp4", "/hero3.mp4"]

export default function HeroVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoSources.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0">
      {/* Background Videos */}
      {videoSources.map((src, index) => (
        <video
          key={index}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          onLoadedData={() => index === 0 && setIsLoading(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-transparent z-20" />
      )}

      {/* Stronger Yellow Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-100 to-yellow-300 opacity-80 z-10"></div> */}
    </div>
  )
}