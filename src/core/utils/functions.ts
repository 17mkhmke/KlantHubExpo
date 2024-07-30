import { authenticate } from "../../../services/authService";

export const getToken = async () => {
  try {
    const accessToken = await authenticate();
    return accessToken;
  } catch (error) {
    throw error;
  }
};