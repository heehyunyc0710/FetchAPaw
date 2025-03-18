import { ILocationSearchParams } from "@/types";
import axios from "axios";

export const fetchDogs = async ({ dogIds = [] }: { dogIds: string[] }) => {
  // no more than 100 dog ids
  try {
    const limitedDogIds = dogIds.slice(0, 100);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs`,
      limitedDogIds,
      {
        withCredentials: true,
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    throw error;
  }
};

export const fetchDogMatch = async ({ favorites }: { favorites: string[] }) => {
  try {
    const response = await axios.post<{ match: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs/match`,
      favorites,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching dog match:", error);
    throw error;
  }
};

export const fetchDogBreeds = async () => {
  try {
    const response = await axios.get<string[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs/breeds`,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw error;
  }
};

export const handleDogSearch = async (params: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs/search?${params}`,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error searching dogs:", error);
    throw error;
  }
};

export const fetchDogLocation = async (zipCodes: string[]) => {
  // no more than 100 ZIP codes
  try {
    const limitedZipCodes = zipCodes.slice(0, 100);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/locations`,
      limitedZipCodes,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching dog location:", error);
    throw error;
  }
};

export const searchLocations = async (params: ILocationSearchParams) => {
  console.log("location params", params);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/search`,
      params,
      { withCredentials: true }
    );
    console.log("responseeeee", response);
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};
