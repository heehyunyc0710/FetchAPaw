import React from "react";
import Image from "next/image";
import { Dog } from "@/types";
import { MapPinIcon, CakeIcon, DogIcon } from "lucide-react";
import { useRouter } from "next/navigation";
const DogInfoCard = ({ dog }: { dog: Dog }) => {
  const router = useRouter();
  return (
    <div>
      <img
        width={300}
        height={300}
        src={dog.img}
        alt={dog.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{dog.name}</h3>
        <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <DogIcon className="w-4 h-4" />
          <p className="font-semibold">Breed: </p>
          <p>{dog.breed}</p>
        </div>
        <div className="flex items-center gap-2">
          <CakeIcon className="w-4 h-4" />
          <p className="font-semibold"> Age: </p>
          <p>{dog.age}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4" />
          <p className="font-semibold"> Zip: </p>
          <p>{dog.zip_code}</p>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default DogInfoCard;
