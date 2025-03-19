import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import CustomCommandList from "@/components/ui/CustomCommandList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDogSearch } from "@/contexts/DogContext";
import { cn } from "@/lib/utils";
import { ILocation, ILocationSearchParams } from "@/types";
import { searchLocations } from "@/utils/getData";
import handleError, { customToast } from "@/utils/handleError";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
const LocationFilter = () => {
  const {
    city,
    setCity,
    state,
    setState,
    zipCodes,
    setZipCodes,
    zipCodeLoading,
    setZipCodeLoading,
  } = useDogSearch();

  const debouncedCity = useDebounce(city, 500);
  const debouncedState = useDebounce(state, 500);
  const [locationObjects, setLocationObjects] = useState<ILocation[]>([]);

  const [locationFilterOpen, setLocationFilterOpen] = useState(false);

  // Fetch locations when debounced values change
  useEffect(() => {
    setLocationObjects([]);

    const fetchLocations = async () => {
      if (!debouncedCity && !debouncedState) return;

      try {
        setZipCodeLoading(true);
        if (
          debouncedState.length &&
          (debouncedState.length !== 2 || !debouncedState.match(/^[A-Za-z ]+$/))
        ) {
          
          customToast("Invalid state!", "Please enter a valid state.", "error");
          return;
        }
        if (debouncedCity.length && !debouncedCity.match(/^[A-Za-z ]+$/)) {

          customToast("Invalid city!", "Please enter a valid city.", "error");
        
          return;
        }

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
      } finally {
        setZipCodeLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedCity, debouncedState]);

  const clearLocation = () => {
    setCity("");
    setState("");
    setZipCodes("");
    setLocationObjects([]);
    setZipCodeLoading(false);
  };

  useEffect(() => {
    clearLocation();
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
              aria-expanded={locationFilterOpen}
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
                setLocationFilterOpen(false);
              }
            }}
            className="min-w-full bg-white"
          >
            {zipCodeLoading ? (
              <div className="flex w-full items-center justify-center text-sm">
                <Loader2 className="animate-spin mr-2" /> Finding locations...
              </div>
            ) : (
              <>
                <Command className="w-full">
                  <CommandInput
                    value={city}
                    onValueChange={setCity}
                    placeholder="City"
                    className="w-full  placeholder:text-xs"
                  />
                  <CustomCommandList className="max-h-[200px] overflow-y-auto w-full">
                    {locationObjects.length > 0 && (
                      <CommandGroup className="w-full">
                        {locationObjects
                          .filter((location) =>
                            location.city
                              .toLowerCase()
                              .includes(city.toLowerCase())
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
                    placeholder="2-letter State"
                    className="w-full placeholder:text-xs"
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
                                location.state === state ? "bg-yellow-200" : ""
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
                    onValueChange={(value) => {
                      if (value.length > 0 && !value.match(/^[0-9]+$/)) {
                        customToast("Invalid zip code!", "Please enter a valid zip code.", "error");
                        return;
                      }
                      setZipCodes(value);
                    }}
                    placeholder="Comma separated ZIP codes"
                    className="w-full placeholder:text-xs"
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
                <button
                  className="mt-4 w-full bg-orange-300 cursor-pointer hover:bg-orange-400 p-2 rounded-md"
                  onClick={clearLocation}
                >
                  Clear Location
                </button>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default LocationFilter;
