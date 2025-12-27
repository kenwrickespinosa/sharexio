import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Searchbar() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Searching ${query}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for folder or file"
            className="w-56.25 px-6 md:w-150 md:h-12"
          />
          <Button type="submit" className="md:w-14 md:h-12 cursor-pointer">
            <IoSearch />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
