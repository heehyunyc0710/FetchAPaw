import { IDog } from "@/types";
import React from "react";

const SearchResultHeader = ({
  city,
  state,
  selectedBreeds,
  ageMin,
  ageMax,
  zipCodes,
  dogs,
}: {
  city: string;
  state: string;
  selectedBreeds: string[];
  ageMin: string;
  ageMax: string;
  zipCodes: string;
  dogs: IDog[];
}) => {
  return (
    <div className="flex justify-center items-center w-full my-10">
    {dogs.length &&  <h1 className="text-md font-bold mb-6 capitalize">
        Search for{" "}
        {selectedBreeds.length > 0 ? selectedBreeds.join(", ") : `all dogs`}
        {city && ` in ${city}`}
        {state && `, ${state}`}
        {!city &&
          !state &&
          zipCodes &&
          `, at Zip ${zipCodes.length > 1 ? "codes" : "code"} ${zipCodes}`}
        {ageMin && `, from ${ageMin} years old`}
        {ageMax && ageMin && `, to ${ageMax} years old`}
      </h1>}
    </div>
  );
};

export default SearchResultHeader;
