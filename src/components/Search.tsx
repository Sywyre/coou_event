import { useSearch } from "@/stores";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const {setQuery} = useSearch();
 
  return (
    <div className="relative mx-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by Surname or NIN"
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
