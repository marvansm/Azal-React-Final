import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const SaveToken = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const saveToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          localStorage.setItem("clerkToken", token);
          console.log("Token saved:", token);
        }
      } catch (err) {
        console.error("Failed to get token:", err);
      }
    };

    saveToken();
  }, [getToken]);

  return null;
};

export default SaveToken;
