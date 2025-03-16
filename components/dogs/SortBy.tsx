import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

const SortBy = ({ sort, setSort }: { sort: string; setSort: (sort: string) => void }) => {
  return (
    <div className="flex gap-2 items-center">
              <Select value={sort} onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="bg-white border-zinc-600 rounded h-[40px] px-2 cursor-pointer">
                  <p className="text-sm ">Sort by</p>
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-600">
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="breed:asc"
                  >
                    Breed (A-Z)
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="breed:desc"
                  >
                    Breed (Z-A)
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="age:asc"
                  >
                    Age (Youngest first)
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="age:desc"
                  >
                    Age (Oldest first)
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="name:asc"
                  >
                    Name (A-Z)
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-yellow-200"
                    value="name:desc"
                  >
                    Name (Z-A)
                  </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy