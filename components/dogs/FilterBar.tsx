import { ILocation, ILocationSearchParams } from "@/types";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { searchLocations } from "../../utils/getData";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import BreedList from "./BreedList";

import { IFilterBarProps } from "@/types";

const sizeOptions = [10, 25, 50, 100]; 

const FilterBar = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
  city,
  setCity,
  state,
  setState,
  zipCodes,
  setZipCodes,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  size,
  setSize,
}: IFilterBarProps) => {
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async (zipCodes: string) => {
      if (!city && !state) return;
      setZipCodes("");

      try {
        const params: ILocationSearchParams = { size: Number(size) };
        if (city) params.city = city;
        if (state) params.states = [state];

        const response = await searchLocations(params);
        console.log("response000", response);

        if (response.results.length > 0) {
          const zipCodesResponse = response.results
            .map((location: ILocation) => location.zip_code)
            .join(",");
          if(zipCodes){
            setZipCodes(zipCodes);
          }else{  
            setZipCodes(zipCodesResponse);
          }
         
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (!open) fetchLocations(zipCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state, open]);

  useEffect(() => {
    if (!city && !state) setZipCodes("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBreeds(breeds);
    } else {
      setSelectedBreeds([]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Breed filter */}
      <div>
        <h2 className="font-semibold mb-2">Breeds</h2>
        <BreedList
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          handleSelectAll={handleSelectAll}
        />
      </div>

      {/* Zip codes filter */}
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
            className="min-w-full bg-white "
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
                  setCity(e.target.value);
                  // setZipCodes("");
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
                  // setZipCodes("");
                }}
                placeholder="2-letter State"
                className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
              />
              <input
                type="text"
                value={zipCodes}
                onChange={(e) => {
                  setZipCodes(e.target.value);
                  // setCity("");
                  // setState("");
                }}
                placeholder="Comma-separated zip codes"
                className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
              />
              
            </div>
            <Button variant="outline" className="w-full justify-start border-zinc-600 bg-orange-100 h-10 shadow-lg  hover:bg-yellow-300 cursor-pointer" onClick={() => {
              setCity("");
              setState("");
              setZipCodes("");
            }}>
              Clear Location
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Age range filters */}
      <div>
        <h2 className="font-semibold mb-2">Age Range</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={ageMin}
            min={0}
            onChange={(e) => setAgeMin(e.target.value)}
            placeholder="Min age"
            className="focus:outline-none focus:border-2 w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
          />
          <input
            type="number"
            value={ageMax}
            min={0}
            max={30}
            onChange={(e) => setAgeMax(e.target.value)}
            placeholder="Max age"
            className="focus:outline-none focus:border-2 w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
          />
        </div>
      </div>

      {/* Results size */}
      <div>
        <h2 className="font-semibold mb-2">Results per page</h2>

        <Select value={size} onValueChange={(value) => setSize(value)}>
          <SelectTrigger className="w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm cursor-pointer">
            <p className="text-sm">{size}</p>
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
    </div>
  );
};

export default FilterBar;
