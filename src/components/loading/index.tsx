import PacmanLoader from "react-spinners/PacmanLoader";
import { useState, useEffect } from "react";

export default function LoadingState() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <PacmanLoader
      color="#000000"
      cssOverride={{}}
      loading={loading}
      size={100}
      speedMultiplier={0.5}
    />
  );
}
