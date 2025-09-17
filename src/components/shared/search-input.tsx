import { cn } from "@/lib/utils";
import { FC } from "react";

interface SearchInputProps {
  className?: string
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
    >
      <input
        className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
        type="text"
        placeholder="Find goods..."
      // onFocus={() => setFocused(true)}
      // value={searchQuery}
      // onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export { SearchInput }