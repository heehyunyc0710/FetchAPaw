import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useDogSearch } from "@/contexts/DogContext";
const sortingOptions = [
  { value: "breed:asc", label: "Breed (A-Z)" },
  { value: "breed:desc", label: "Breed (Z-A)" },
  { value: "age:asc", label: "Age (Youngest first)" },
  { value: "age:desc", label: "Age (Oldest first)" },
  { value: "name:asc", label: "Name (A-Z)" },
  { value: "name:desc", label: "Name (Z-A)" },
];

const SortBy = () => {
  const { sort, setSort } = useDogSearch();
  const [sortByKey, setSortByKey] = useState<string>("Breed (A-Z)");
  const handleSortValueChange = (value: string) => {
    setSort(value);
    const selectedOption = sortingOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setSortByKey(selectedOption.label);
    }
  };

  return (
    <div className="flex gap-2 items-center mr-2">
      <Select value={sort} onValueChange={handleSortValueChange}>
        <SelectTrigger className="bg-white border-zinc-600 rounded h-[40px] px-2 cursor-pointer">
          <p className="text-sm">Sort by</p>
          <p>{sortByKey || "Select"}</p>
        </SelectTrigger>
        <SelectContent className="bg-white border-zinc-600">
          {sortingOptions.map((option) => (
            <SelectItem
              key={option.value}
              className="cursor-pointer hover:bg-yellow-200"
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy;
