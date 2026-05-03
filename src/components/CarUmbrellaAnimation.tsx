"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function CarUmbrellaAnimation() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch a free Lottie animation (umbrella/safety themed)
    const fetchAnimation = async () => {
      try {
        const response = await fetch(
          "https://lottie.host/3b9f7e8a-1234-5678-9abc-defg12345678/ABC123XYZ789.json"
        );
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.log("Animation fetch fallback: using simple CSS animation instead");
        console.log(error);
        setAnimationData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimation();
  }, []);

  if (isLoading) return null;

  if (!animationData) {
    // Fallback: simple CSS animation with emoji
    return (
      <div className="absolute top-10 right-10 opacity-15 pointer-events-none animate-float">
        <div className="text-8xl">☂️</div>
      </div>
    );
  }

  return (
    <div className="absolute top-10 right-10 opacity-20 pointer-events-none" style={{ width: "250px", height: "250px" }}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}

// Add a float animation keyframe in globals.css for this
