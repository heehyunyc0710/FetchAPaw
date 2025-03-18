import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import CustomCommandList from "@/components/ui/CustomCommandList";
import { ILocation, ILocationSearchParams } from "@/types";
import { useDogSearch } from "@/contexts/DogContext";
import { useEffect, useState } from "react";
import { searchLocations } from "@/utils/getData";
import handleError from "@/utils/handleError";
import { useDebounce } from "@/utils/hooks/useDebounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LocationFilter = () => {
  const { city, setCity, state, setState, zipCodes, setZipCodes } =
    useDogSearch();

  const debouncedCity = useDebounce(city, 500);
  const debouncedState = useDebounce(state, 500);
  const [locationObjects, setLocationObjects] = useState<ILocation[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch locations when debounced values change
  useEffect(() => {
    setLocationObjects([]);

    const fetchLocations = async () => {
      if (!debouncedCity && !debouncedState) return;

      try {
        const params: ILocationSearchParams = {};
        if (debouncedCity) params.city = debouncedCity;
        if (debouncedState) params.states = [debouncedState];
        params.size = 10000;

        const response = await searchLocations(params);

        if (response.results.length > 0) {
          setLocationObjects(response.results);
          const zipCodes = response.results.map(
            (location: ILocation) => location.zip_code
          );
          setZipCodes(zipCodes.join(","));
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchLocations();
  }, [debouncedCity, debouncedState]);

  useEffect(() => {
    setCity("");
    setState("");
    setZipCodes("");
    setLocationObjects([]);
  }, []);

  return (
    <div>
      <h2 className="font-semibold mb-2">Location</h2>

      {/* City Input */}
      <div className="mb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-zinc-600 bg-white/70 h-10 shadow-lg"
            >
              {city && state ? `${city}, ${state}` : "Select location..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
              }
            }}
            className="min-w-full bg-white"
          >
            <Command className="w-full">
              <CommandInput
                value={city}
                onValueChange={setCity}
                placeholder="City"
                className="w-full"
              />
              <CustomCommandList className="max-h-[200px] overflow-y-auto w-full">
                {locationObjects.length > 0 && (
                  <CommandGroup className="w-full">
                    {locationObjects
                      .filter((location) =>
                        location.city.toLowerCase().includes(city.toLowerCase())
                      )
                      .filter(
                        (location, index, self) =>
                          index ===
                          self.findIndex((l) => l.city === location.city)
                      )
                      .map((location) => (
                        <CommandItem
                          key={`${location.city}-${location.state}-${location.zip_code}`}
                          value={location.city}
                          className={`hover:bg-yellow-200 cursor-pointer ${
                            location.city === city ? "bg-yellow-200" : ""
                          }`}
                          onSelect={() => {
                            setCity(location.city);
                            // if (state === location.state) {
                            //   setZipCodes(location.zip_code);
                            // }
                          }}
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2",
                                location.city === city
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />{" "}
                            {location.city}
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </CustomCommandList>
            </Command>
            <Command className="w-full">
              <CommandInput
                value={state}
                onValueChange={(value) => setState(value.toUpperCase())}
                placeholder="State"
                className="w-full"
              />
              <CustomCommandList className="max-h-[200px] overflow-y-auto w-full">
                {locationObjects.length > 0 && (
                  <CommandGroup className="w-full">
                    {locationObjects
                      .filter((location) =>
                        location.state
                          .toLowerCase()
                          .includes(state.toLowerCase())
                      )
                      .filter(
                        (location, index, self) =>
                          index ===
                          self.findIndex((l) => l.state === location.state)
                      )
                      .map((location) => (
                        <CommandItem
                          key={`state-${location.state}`}
                          value={location.state}
                          className={`hover:bg-yellow-200 cursor-pointer ${
                            location.state === state
                              ? "bg-yellow-200"
                              : ""
                          }`}
                          onSelect={() => {
                            setState(location.state);
                          }}
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2",
                                location.state === state
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {location.state}
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </CustomCommandList>
            </Command>
            <Command className="w-full">
              <CommandInput
                value={zipCodes}
                onValueChange={setZipCodes}
                placeholder="Comma separated zip codes"
                className="w-full"
              />
              <CustomCommandList className="max-h-[200px] overflow-y-auto w-full">
                {zipCodes.length > 0 && (
                  <CommandGroup className="w-full">
                    {zipCodes.split(",").map((zip) => (
                      <CommandItem
                        key={`Zip code-${zip}`}
                        value={zip}
                        className="hover:bg-yellow-200 cursor-pointer"
                        onSelect={() => {
                          setZipCodes(zip);
                        }}
                      >
                        <div className="flex items-center">{zip}</div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CustomCommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default LocationFilter;
