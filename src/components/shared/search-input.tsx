"use client"

import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { productsSearch } from "./services/products";

interface SearchInputProps {
  className?: string
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { className } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  const handlerSearch = useCallback(() => {
    useDebounce(
      async () => {
        try {
          const response = await productsSearch(searchQuery);
          setProducts(response);
        } catch (error) {
          console.log(error);
        }
      },
      250,
      [searchQuery],
    );
  }, [searchQuery])

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

      <div
        ref={ref}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative z-30',
          'h-9 xs:h-10 sm:h-11 md:h-12',
          className
        )}>
        <Search className={cn(
          "absolute top-1/2 translate-y-[-50%] text-gray-400",
          "left-2 xs:left-3 sm:left-4",
          "h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5"
        )} />
        <input
          className={cn(
            "rounded-2xl outline-none w-full bg-gray-100",
            "pl-8 xs:pl-10 sm:pl-11 md:pl-12",
            "text-sm xs:text-base sm:text-lg",
            "placeholder:text-xs xs:placeholder:text-sm sm:placeholder:text-base"
          )}
          type="text"
          placeholder="Знайти піцу..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handlerSearch()
          }}
        />

        {Boolean(products.length) && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              'top-12 xs:top-14 sm:top-16',
              'max-h-48 xs:max-h-56 sm:max-h-64 md:max-h-72',
              focused && 'visible opacity-100 top-11 xs:top-13 sm:top-15'
            )}>
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-2 xs:gap-3 w-full px-2 xs:px-3 py-1 xs:py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}>
                <img
                  className={cn(
                    "rounded-sm object-cover",
                    "h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8"
                  )}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span className="text-xs xs:text-sm sm:text-base line-clamp-1">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export { SearchInput }