"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  // CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface BreedListProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  handleSelectAll: (checked: boolean) => void;
}

const BreedList: React.FC<BreedListProps> = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
  handleSelectAll,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-zinc-600 bg-white/70 h-10 shadow-lg"
        >
          {selectedBreeds.length > 0
            ? `${selectedBreeds.length} breed${
                selectedBreeds.length > 1 ? "s" : ""
              } selected`
            : "Select breeds..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setOpen(false);
          }
        }}
        className="min-w-full bg-white"
      >
        <Command className="w-full">
          <CommandInput placeholder="Search breeds..." className="w-full" />
          <CommandList className="max-h-[300px] overflow-y-auto w-full">
            {/* <CommandEmpty>No breeds found.</CommandEmpty> */}
            <CommandGroup className="w-full">
              <CommandItem
                value="select-all"
                onSelect={() => {
                  handleSelectAll(selectedBreeds.length !== breeds.length);
                }}
              >
                <div className="flex items-center">
                  <Check
                    className={cn(
                      "mr-2",
                      selectedBreeds.length === breeds.length
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  Select All
                </div>
              </CommandItem>
              {breeds.map((breed) => (
                <CommandItem
                  key={breed}
                  value={breed}
                  onSelect={() => {
                    if (selectedBreeds.includes(breed)) {
                      setSelectedBreeds(
                        selectedBreeds.filter((b) => b !== breed)
                      );
                    } else {
                      setSelectedBreeds([...selectedBreeds, breed]);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2",
                        selectedBreeds.includes(breed)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {breed}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BreedList;
