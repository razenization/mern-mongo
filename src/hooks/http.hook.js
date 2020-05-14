import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./auth.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const history = useHistory();

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          if (!body.formData) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
          } else {
            body = body.formData;
          }
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        if (error === "No auth") {
          logout();
          history.go(0);
        }
      }
    },
    [error, logout, history]
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
