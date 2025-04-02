
import React, { useEffect, useState, useRef } from "react";

const LiveLocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const lastPosition = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((permission) => {
      if (permission.state === "denied") {
        setError("Location access denied. Please allow location access.");
      }
    });

    navigator.geolocation.getCurrentPosition(
        
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        lastPosition.current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      },
      (err) => {
        setError("Unable to get initial location: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
      
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        if (accuracy > 100) {
          console.warn("Low accuracy detected:", accuracy, "m");
          setError("GPS signal weak. Try moving to an open area.");
          return;
        }

        if (lastPosition.current) {
          const distance = getDistance(lastPosition.current, { lat: latitude, lng: longitude });
          if (distance < 10) return;
        }

        console.log("Updated Position:", latitude, longitude, "Accuracy:", accuracy);
        setPosition({ lat: latitude, lng: longitude });
        lastPosition.current = { lat: latitude, lng: longitude };
        setError(null);
      },
      (err) => {
        setError("Error fetching location: " + err.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
    
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {error && (
        <p className="absolute top-15 z--2 text-red-600 text-lg font-semibold bg-white p-2 rounded-md shadow-md">
          {error}
        </p>
      )}
      {position ? (
        <iframe
          className="w-full h-full absolute z-0 pb-10" // ✅ Prevents overlap & keeps map in the background
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${position.lat},${position.lng}&z=15&output=embed`}
        ></iframe>
      ) : (
        <p className="text-xl font-semibold text-gray-700">Fetching location...</p>
      )}
    </div>
  );
};

// ✅ Function to calculate distance between two points (in meters)
const getDistance = (pos1, pos2) => {
  const R = 6371000;
  const lat1 = (pos1.lat * Math.PI) / 180;
  const lat2 = (pos2.lat * Math.PI) / 180;
  const deltaLat = lat2 - lat1;
  const deltaLon = ((pos2.lng - pos1.lng) * Math.PI) / 180;
  

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default LiveLocation;

