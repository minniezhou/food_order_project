import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const httpRequest = useCallback(async (configuration, applyData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(configuration.url, { ...configuration });
      if (!response.ok) {
        throw new Error("Connection went wrong!");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  return { error, isLoading, httpRequest };
};

export default useHttp;
