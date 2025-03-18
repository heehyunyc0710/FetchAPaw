import { IDog, ILocation } from "@/types";
import { fetchDogLocation } from "@/utils/getData";
import { CakeIcon, DogIcon, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import handleError from "@/utils/handleError";
const DogInfoCard = ({ dog }: { dog: IDog }) => {

  const [location, setLocation] = useState<ILocation | null>(null);
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetchDogLocation([dog.zip_code]);
        setLocation(response[0]);
      } catch (error) {
        handleError(error);
      }
    };
    fetchLocation();
  }, [dog]);
  
  return (
    <div>
      <div className="relative w-full md:h-56 z-0 h-96">
        <Image
          src={dog.img}
          alt={dog.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{dog.name}</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-[100px]">
              <DogIcon className="w-4 h-4" />
              <p className="font-semibold mr-1">Breed: </p>
            </div>
            <p>{dog.breed}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-[100px]">
              <CakeIcon className="w-4 h-4" />
              <p className="font-semibold mr-1"> Age: </p>
            </div>
            <p>{dog.age}</p>
          </div>
          {location && (
            <div className="flex items-start gap-2 ">
              <div className="flex items-center gap-2 w-[100px]">
                <MapPinIcon className="w-4 h-4" />
                <p className="font-semibold mr-1"> Location: </p>
              </div>
              <div className="flex-1 flex flex-wrap gap-1">
                <p>{location.city},</p>
                <p>{location.county},</p>
                <p>{location.state}</p>
                <p>{location.zip_code}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogInfoCard;
