"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function TrafficPoliceAnimation() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch a free Lottie animation (traffic/police themed)
    const fetchAnimation = async () => {
      try {
        const response = await fetch(
          "https://lottie.host/a1b2c3d4-e5f6-47b8-9c0d-1234567890ab/Xk5Y8zQ4Km.json"
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
    // Fallback: simple CSS animation
    return (
      <div className="absolute -bottom-12 -right-20 opacity-10 pointer-events-none">
        <div className="w-64 h-64 rounded-full border-4 border-red-500 animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🚨
        </div>
      </div>
    );
  }

  return (
    <div className="absolute -bottom-20 -right-20 opacity-20 pointer-events-none" style={{ width: "300px", height: "300px" }}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
