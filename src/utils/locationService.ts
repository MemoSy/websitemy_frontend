export interface LocationData {
  country: string;
  city: string;
}

// Get user location using IP geolocation
export const getUserLocation = async (): Promise<LocationData> => {
  try {
    // First try with ipapi.co (free and reliable, supports HTTPS)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'User-Agent': 'WebSiteMy/1.0'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.country_name && data.city) {
        return {
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown'
        };
      }
    }
  } catch (error) {
    console.error('Error with ipapi.co:', error);
  }

  try {
    // Fallback to ipinfo.io (also supports HTTPS)
    const response = await fetch('https://ipinfo.io/json', {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country || 'Unknown',
        city: data.city || 'Unknown'
      };
    }
  } catch (error) {
    console.error('Error with ipinfo.io:', error);
  }

  try {
    // Another fallback to ip-api.com (HTTP only, use with caution)
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown'
      };
    }
  } catch (error) {
    console.error('Error with fallback service:', error);
  }

  // If all services fail, return default values
  return {
    country: 'Unknown',
    city: 'Unknown'
  };
};

// Cache location for session to avoid multiple API calls
let cachedLocation: LocationData | null = null;

export const getCachedUserLocation = async (): Promise<LocationData> => {
  if (cachedLocation) {
    return cachedLocation;
  }
  
  cachedLocation = await getUserLocation();
  return cachedLocation;
};
