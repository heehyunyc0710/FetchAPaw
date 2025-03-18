import { useDogSearch } from '@/contexts/DogContext';
import React from 'react'


const AgeFilter = ({loading}: {loading: boolean}) => {
    const {ageMin, ageMax, setAgeMin, setAgeMax} = useDogSearch()
  return (
     <div>
        <h2 className="font-semibold mb-2">Age Range</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={ageMin}
            min={0}
            max={30}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setAgeMin(e.target.value);
              }
            }}
            placeholder="Min age"
            className="focus:outline-none focus:border-2 w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm placeholder:text-zinc-500"
          />
          <input
            type="number"
            value={ageMax}
            min={0}
            max={30}
            disabled={loading}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setAgeMax(e.target.value);
              }
            }}
            placeholder="Max age"
            className="focus:outline-none focus:border-2 w-full p-2 border rounded h-[40px] border-zinc-600 shadow-md bg-white/70 text-sm placeholder:text-zinc-500"
          />
        </div>
      </div>
  )
}

export default AgeFilter