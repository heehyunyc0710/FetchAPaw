import axios from "axios";

export const fetchDogs = async ({ dogIds = [] }: { dogIds: string[] }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/dogs`,
    dogIds,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const fetchDogMatch = async ({ favorites }: { favorites: string[] }) => {
  const response = await axios.post<{ match: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/dogs/match`,
    favorites,
    { withCredentials: true }
  );
  return response.data;
};

export const fetchDogBreeds = async () => {
  const response = await axios.get<string[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/dogs/breeds`,
    { withCredentials: true }
  );
  return response.data;
};

export const handleDogSearch = async (params: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/dogs/search?${params}`,
    { withCredentials: true }
  );
  return response.data;
};

export const fetchDogLocation = async (zipCodes: string[]) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/locations`,
    zipCodes,

    { withCredentials: true }
  );
  return response.data;
};
