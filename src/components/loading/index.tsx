"use client";
import { ScaleLoader } from "react-spinners";
import { useState, useEffect } from "react";

export default function LoadingState() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <ScaleLoader
        color="#000000"
        loading={loading}
        radius={2}
        width={10}
        height={100}
        speedMultiplier={0.5}
      />
    </div>
  );
}
