"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DogDetail from "@/components/dogs/DogDetail";
import { useDogSearch } from "@/contexts/DogContext";
import { Dog } from "@/types";
import axios from "axios";
import Loader from "@/components/Loader";
import { fetchDogs } from "@/utils/getData";

const DogDetailPage = () => {
  const params = useParams();
  const dogId = params.id as string;
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const { dogs } = useDogSearch();

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        
        const existingDog = dogs.find((d) => d.id === dogId);
        if (existingDog) {
          setDog(existingDog);
          return;
        }

        // If not found, fetch from API
        const response = await fetchDogs({dogIds: [dogId]});

        if (response.length > 0) {
          setDog(response[0]);
        } else {
          console.error("Dog not found");
        
        }
      } catch (error) {
        console.error("Error fetching dog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogData();
  }, [dogId, dogs]); 

  if (loading) {
    return <Loader/>
  }

  if (!dog) {
    return <div className="p-4">Dog not found</div>;
  }

  return <DogDetail dog={dog} />;
};

export default DogDetailPage;
