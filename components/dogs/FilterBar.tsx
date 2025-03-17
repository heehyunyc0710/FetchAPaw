import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import BreedList from "./BreedList";
import { useState, useEffect } from "react";
import { searchLocations } from "../../utils/getData";
import { ILocation } from "@/types";
import { ILocationSearchParams } from "@/types";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
interface IFilterBarProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;

  city: string;
  setCity: (city: string) => void;
  state: string;
  setState: (state: string) => void;
  // selectOpen: boolean;
  // setSelectOpen: (open: boolean) => void;
  // selectRef: React.RefObject<HTMLDivElement>;
  zipCodes: string;
  setZipCodes: (zipCodes: string) => void;
  ageMin: string;
  setAgeMin: (ageMin: string) => void;
  ageMax: string;
  setAgeMax: (ageMax: string) => void;
  size: string;
  setSize: (size: string) => void;
}
const FilterBar = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,

  city,
  setCity,
  state,
  setState,
  // selectOpen,
  // setSelectOpen,
  // selectRef,
  zipCodes,
  setZipCodes,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  size,
  setSize,
}: IFilterBarProps) => {
  const debouncedCity = useDebounce(city, 1500);
  const debouncedState = useDebounce(state, 1500);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchLocations = async () => {
      if (!debouncedCity && !debouncedState) return;
      setZipCodes("");

      try {
        const params: ILocationSearchParams = { size: 25 };
        if (debouncedCity) params.city = debouncedCity;
        if (debouncedState) params.states = [debouncedState];

        const response = await searchLocations(params);
        console.log("response000", response);

        if (response.results.length > 0) {
          const zipCodes = response.results
            .map((location: ILocation) => location.zip_code)
            .join(",");
          console.log("zipCodes", zipCodes);
          setZipCodes(zipCodes);
        }
        setOpen(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [debouncedCity, debouncedState]);

  useEffect(() => {
    if (!city && !state) setZipCodes("");
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
          // selectOpen={selectOpen}
          // setSelectOpen={setSelectOpen}
          // selectRef={selectRef as React.RefObject<HTMLDivElement>}
        />
      </div>

      {/* Zip codes filter */}
      <div>
        <h2 className="font-semibold mb-2">Location</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="w-full justify-start border-zinc-600 bg-white/70 h-10">
              <MapPin className="w-full" /> Filter by location
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full bg-white">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
              placeholder="2-letter State"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
            <input
              type="text"
              value={zipCodes}
              onChange={(e) => setZipCodes(e.target.value)}
              placeholder="Comma-separated zip codes"
              className="focus:outline-none focus:border-2 w-full p-2 border-b rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
            />
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
            <p className="text-sm ">{size}</p>
          </SelectTrigger>
          <SelectContent className="bg-white border-zinc-600">
            <SelectItem
              className="cursor-pointer hover:bg-yellow-200"
              value="10"
            >
              10
            </SelectItem>
            <SelectItem
              className="cursor-pointer hover:bg-yellow-200"
              value="25"
            >
              25
            </SelectItem>
            <SelectItem
              className="cursor-pointer hover:bg-yellow-200"
              value="50"
            >
              50
            </SelectItem>
            <SelectItem
              className="cursor-pointer hover:bg-yellow-200"
              value="100"
            >
              100
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
