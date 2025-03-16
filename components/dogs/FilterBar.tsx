import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import BreedList from "./BreedList";

interface IFilterBarProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;

  selectOpen: boolean;
  setSelectOpen: (open: boolean) => void;
  selectRef: React.RefObject<HTMLDivElement>;
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

  selectOpen,
  setSelectOpen,
  selectRef,
  zipCodes,
  setZipCodes,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  size,
  setSize,
}: IFilterBarProps) => {
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
          selectOpen={selectOpen}
          setSelectOpen={setSelectOpen}
          selectRef={selectRef as React.RefObject<HTMLDivElement>}
        />
      </div>

      {/* Zip codes filter */}
      <div>
        <h2 className="font-semibold mb-2">Zip Codes</h2>
        <input
          type="text"
          value={zipCodes}
          onChange={(e) => setZipCodes(e.target.value)}
          placeholder="Comma-separated zip codes"
          className="focus:outline-none focus:border-2 w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm "
        />
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
