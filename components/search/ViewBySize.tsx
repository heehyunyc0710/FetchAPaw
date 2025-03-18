import React from "react";
import { SelectTrigger } from "../ui/select";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { useDogSearch } from "@/contexts/DogContext";

const sizeOptions = [10, 25, 50, 100];

const ViewBySize = () => {
  const { size, setSize } = useDogSearch();
  return (
    <div>
      <Select value={size} onValueChange={(value) => setSize(value)}>
        <SelectTrigger className="w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white text-sm cursor-pointer">
          <p className="text-sm">Viewing {size} results per page</p>
        </SelectTrigger>
        <SelectContent className="bg-white border-zinc-600">
          {sizeOptions.map((option) => (
            <SelectItem
              key={option}
              className="cursor-pointer hover:bg-yellow-200"
              value={option.toString()}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ViewBySize;
