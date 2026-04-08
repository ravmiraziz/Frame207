import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "../../lib/utils";
import type { User, Team } from "../../api/mock";

interface MultiSelectProps {
  selectedItems: (User | Team)[];
  onChange: (items: (User | Team)[]) => void;
  options: (User | Team)[];
  onSearchChange: (query: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  isLoading?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  selectedItems,
  onChange,
  options,
  onSearchChange,
  placeholder = "Укажите исполнителей",
  className,
  error,
  isLoading,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  const handleRemove = (itemToRemove: User | Team) => {
    onChange(selectedItems.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <Combobox value={selectedItems} onChange={onChange} multiple>
      <div className={cn("relative mt-1", className)}>
        <div
          className={cn(
            "relative w-full cursor-default overflow-hidden rounded-3xl bg-white text-left border border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 sm:text-sm min-h-[40px] transition-colors flex flex-wrap items-center gap-1 p-1 pl-3",
            error && "border-red-500 focus-within:ring-red-500",
          )}
        >
          {selectedItems.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
            >
              {"avatar" in item && item.avatar && (
                <img
                  src={item.avatar}
                  alt=""
                  className="h-4 w-4 rounded-full"
                />
              )}
              {item.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="ml-1 rounded-full hover:bg-purple-200 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <Combobox.Input
            className="flex-1 border-none py-1.5 text-sm leading-5 text-gray-900 focus:ring-0 min-w-[120px] bg-transparent outline-none"
            placeholder={selectedItems.length === 0 ? placeholder : ""}
            onChange={handleSearch}
            displayValue={() => ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown
              className="h-4 w-4 text-purple-600"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => {
            setQuery("");
            onSearchChange("");
          }}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {isLoading ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Загрузка...
              </div>
            ) : options.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Ничего не найдено.
              </div>
            ) : (
              options.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-4 pr-4 flex items-center gap-3",
                      active ? "bg-purple-50 text-purple-900" : "text-gray-900",
                    )
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded border transition-colors",
                          selected
                            ? "bg-purple-600 border-purple-600 text-white"
                            : "border-gray-300 bg-white",
                        )}
                      >
                        {selected && <Check className="h-3 w-3" />}
                      </div>
                      {"avatar" in item && item.avatar && (
                        <img
                          src={item.avatar}
                          alt=""
                          className="h-6 w-6 rounded-full"
                        />
                      )}
                      <span
                        className={cn(
                          "block truncate",
                          selected ? "font-medium" : "font-normal",
                        )}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
