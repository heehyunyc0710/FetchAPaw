import React from "react";
import Image from "next/image";
import { Dog } from "@/types";
const DogInfoCard = ({ dog }: { dog: Dog }) => {
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
        <h3 className="font-bold text-lg">{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Zip Code: {dog.zip_code}</p>
      </div>
    </div>
  );
};

export default DogInfoCard;
