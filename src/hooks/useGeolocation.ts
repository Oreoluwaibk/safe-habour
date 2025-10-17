"use client"
import { useState } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

interface GeolocationState {
  location: Location;
  loading: boolean;
  error: string | null;
  getLocation: () => Promise<void>;
}

export const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    // ✅ Check HTTPS (required in production)
    const isLocalhost = window.location.hostname === 'localhost';
    const isSecure = window.location.protocol === 'https:';
    if (!isLocalhost && !isSecure) {
      setError('Geolocation only works over HTTPS or on localhost.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Check permission first
      const permission = await navigator.permissions
        ?.query({ name: 'geolocation' as PermissionName })
        .catch(() => null); // some browsers don’t support Permissions API

      if (permission?.state === 'denied') {
        setError('Please enable location access in your browser settings.');
        setLoading(false);
        return;
      }

      // ✅ Request location
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
          setError(null);
          setLoading(false);
        },
        (err) => {
          let message = '';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              message = 'User denied the request for Geolocation.';
              break;
            case err.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case err.TIMEOUT:
              message = 'The request to get user location timed out.';
              break;
            default:
              message = 'An unknown error occurred while getting location.';
          }
          setError(message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Unexpected error occurred while fetching location.");
      }
      setLoading(false);
    }
  };

  return { location, loading, error, getLocation };
};
