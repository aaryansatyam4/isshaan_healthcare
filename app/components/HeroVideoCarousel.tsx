"use client";

import { useEffect, useState } from "react"

const videoSources = ["/hero1.mp4","/run.mp4","/hero2.mp4", "/hero3.mp4"]

export default function HeroVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Stronger Yellow Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-100 to-yellow-300 opacity-80 z-10"></div> */}
    </div>
  )
}
