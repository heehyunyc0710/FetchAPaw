"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { IBreedListProps } from "@/types";
import CustomCommandList from "../../ui/CustomCommandList";

const BreedList: React.FC<IBreedListProps> = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
  clearFilter,
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
            e.stopPropagation();
            setOpen(false);
          }
        }}
        className="min-w-full bg-white"
      >
        <Command
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="w-full"
        >
          <CommandInput
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            placeholder="Search breeds..."
            className="w-full"
          />
          <CustomCommandList className="max-h-[300px] overflow-y-auto w-full">
            {/* <CommandEmpty>No breeds found.</CommandEmpty> */}
            <CommandGroup className="w-full ">
              <CommandItem
                value="select-all"
                className="cursor-pointer"
                onSelect={() => {
                  clearFilter();
                }}
              >
                <div className="flex items-center bg-orange-300 hover:shadow-lg hover:bg-orange-400 w-full p-2 rounded-md">
                  <Check
                    className={cn(
                      "mr-2",
                      selectedBreeds.length === breeds.length
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  Clear All
                </div>
              </CommandItem>
              {breeds.length > 0 &&
                breeds.map((breed) => (
                  <CommandItem
                    className={`hover:bg-yellow-200 cursor-pointer ${
                      selectedBreeds.includes(breed) ? "bg-yellow-300" : ""
                    }`}
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
          </CustomCommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BreedList;
