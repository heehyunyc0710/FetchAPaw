import { Dog } from "@/types";
import { CakeIcon, DogIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

const DogInfoCard = ({ dog }: { dog: Dog }) => {

  return (
    <div>
      <div className="relative w-full h-48 z-0">
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
