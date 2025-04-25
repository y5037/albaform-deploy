import instance from "../api/api";
import { User } from "../types";

export const fetchUser = async (user: User) => {
  try {
    const response = await instance.get("/users/me");
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
