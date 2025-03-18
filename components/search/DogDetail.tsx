import { IDog, ILocation } from "@/types";
import { fetchDogLocation } from "@/utils/getData";
import { CakeIcon, Dna, Dog as DogIcon, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Map } from "../Map";
import Image from "next/image";


const DogDetail = ({ dog }: { dog: IDog }) => {
  const [location, setLocation] = useState<ILocation | null>(null);
  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetchDogLocation([dog.zip_code]);
      console.log("response", response);
      setLocation(response[0]);
    };
    fetchLocation();
  }, [dog]);

  return (
    <div className="flex  items-center justify-between h-[80vh] w-screen md:px-20 px-6 gap-10">
      <div className="w-[fit-content]  md:max-w-[60%] max-w-[65%] h-[100%] overflow-hidden rounded-lg flex items-center justify-center">
        {dog && dog.img && (
          <Image src={dog.img} alt={dog.name} width={1000} height={1000} />
        )}
      </div>
      {dog && (
        <div className="flex-1 flex flex-col h-[100%] overflow-hidden rounded-lg items-start  justify-start p-6 text-xl">
          <div className="flex items-center gap-2">
            <DogIcon className="w-10 h-10 mb-10 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-10">
              Hi, I&apos;m {dog.name}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <CakeIcon />
              <p> {dog.age}</p>
            </div>
            <div className="flex gap-2">
              <Dna />
              <p> {dog.breed}</p>
            </div>

            {location && (
              <div className="flex gap-2 mb-12">
                <MapPin />
                <p>{location.city},</p>
                <p>{location.county},</p>
                <p>{location.state}</p>
                <p>{location.zip_code}</p>
              </div>
            )}
          </div>
          {location && (
            <Map latitude={location.latitude} longitude={location.longitude} />
          )}
        </div>
      )}
    </div>
  );
};

export default DogDetail;
