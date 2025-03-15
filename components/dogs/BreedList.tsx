
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BreedListProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  handleSelectAll: (checked: boolean) => void;
  selectOpen: boolean;
  setSelectOpen: (open: boolean) => void;
  selectRef: React.RefObject<HTMLDivElement>;
}

const BreedList: React.FC<BreedListProps> = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
  handleSelectAll,
  selectOpen,
  setSelectOpen,
  selectRef,
}) => {


  return (
    <Select
    open={selectOpen}
      value={selectedBreeds.join(",")}
      onValueChange={(value) => {
        if (!selectedBreeds.includes(value)) {
          setSelectedBreeds([...selectedBreeds, value]);
        } else {
          setSelectedBreeds(selectedBreeds.filter((breed) => breed !== value));
        }
      }}
    >
      <SelectTrigger onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectOpen(!selectOpen);
                }}
                className="w-full h-[40px] border-yellow-300 bg-white/70">
        <SelectValue placeholder="Select Breeds">
                  {selectedBreeds.length > 0
                    ? `${selectedBreeds.length} breed${
                        selectedBreeds.length > 1 ? "s" : ""
                      } selected`
                    : null}
                </SelectValue>
      </SelectTrigger>
      <SelectContent ref={selectRef} className="bg-white">
        <div className="px-2 py-1 border-b">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBreeds.length === breeds.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
            <span className="text-sm">Select All</span>
          </label>
        </div>
        {breeds.map((breed, index) => (
          <SelectItem
            key={index}
            value={breed}
            className={`cursor-pointer ${
              selectedBreeds.includes(breed)
                ? "bg-yellow-100 text-yellow-700 font-medium"
                : "hover:bg-yellow-100"
            }`}
          >
            {breed}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BreedList;