import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TagsSelect = ({
  selectedTags,
  onChange,
  options,
  placeholder = "Укажите соответствующие теги",
  className,
  error
}) => {
  const selectedItems = options.filter(opt => selectedTags.includes(opt.id));

  const handleRemove = (idToRemove) => {
    onChange(selectedTags.filter(id => id !== idToRemove));
  };

  return (
    <Listbox value={selectedTags} onChange={onChange} multiple>
      <div className={cn("relative mt-1", className)}>
        <Listbox.Button className={cn(
          "relative w-full cursor-default overflow-hidden rounded-full bg-white text-left border border-gray-300 focus:outline-none focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 sm:text-sm min-h-[40px] transition-colors flex flex-wrap items-center gap-1 p-1 pl-4 pr-10",
          error && "border-red-500 focus-visible:ring-red-500"
        )}>
          {selectedItems.length === 0 ? (
            <span className="text-gray-400 block truncate py-1">{placeholder}</span>
          ) : (
            selectedItems.map((item) => (
              <span
                key={item.id}
                className={cn("flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-white", item.color || "bg-purple-500")}
              >
                {item.name}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="ml-1 rounded-full hover:bg-black/20 p-0.5 cursor-pointer inline-flex"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-purple-600">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                  )
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span className={cn("block truncate", selected ? "font-medium" : "font-normal")}>
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
