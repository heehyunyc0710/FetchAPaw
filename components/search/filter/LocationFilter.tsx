import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDogSearch } from "@/contexts/DogContext";
import { MapPin } from "lucide-react";
import React from "react";

const LocationFilter = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { city, state, zipCodes, setCity, setState, setZipCodes } =
    useDogSearch();
  return (
    <div>
      <h2 className="font-semibold mb-2">Location</h2>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start border-zinc-600 bg-white/70 h-10 shadow-lg"
          >
            <MapPin className="w-full" /> Filter by location
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="min-w-full  bg-white "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setOpen(false);
            }
          }}
        >
          <div className="mb-2">
            <input
              type="text"
              value={city}
              onChange={(e) => {
                const value = e.target.value;
                const capitalizedValue = value
                  .split(" ") 
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
                  .join(" "); 
                setCity(capitalizedValue); 
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setOpen(false);
                }
              }}
              placeholder="City"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
            <input
              type="text"
              value={state}
              onChange={(e) => {
                setState(e.target.value.toUpperCase());
              }}
              placeholder="2-letter State"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
            <input
              type="text"
              value={zipCodes}
              onChange={(e) => {
                setZipCodes(e.target.value);
              }}
              placeholder="Comma-separated zip codes"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className=" flex-1 justify-start border-zinc-600 bg-orange-300 h-10 shadow-lg  hover:bg-orange-400 cursor-pointer mb-2"
              onClick={() => {
                setOpen(false);
              }}
            >
              Confirm Location
            </Button>
            <Button
              variant="outline"
              className=" justify-start border-zinc-600 bg-orange-100 h-10 shadow-lg  hover:bg-yellow-300 cursor-pointer"
              onClick={() => {
                setCity("");
                setState("");
                setZipCodes("");
              }}
            >
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationFilter;
