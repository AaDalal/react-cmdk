import React, { ReactNode, useState, useRef } from "react";
import CommandPalettePopover from "./CommandPalettePopover";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { RenderLink } from "../types";

interface SearchWithCommandPaletteProps {
  renderLink?: RenderLink;
  placeholder?: string;
  children: ReactNode;
  footer?: ReactNode;
  page?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  popoverPosition?: "bottom" | "bottom-right" | "bottom-left";
  triggerType?: "button" | "input";
}

function SearchWithCommandPalette({
  placeholder = "Search",
  renderLink,
  children,
  footer,
  page,
  buttonClassName = "",
  popoverClassName = "",
  popoverPosition = "bottom",
  triggerType = "button",
}: SearchWithCommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    bottom: "top-full mt-2 left-0 right-0",
    "bottom-right": "top-full mt-2 right-0",
    "bottom-left": "top-full mt-2 left-0",
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative">
      {triggerType === "button" ? (
        <button
          type="button"
          onClick={handleOpen}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 ${buttonClassName}`}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span>{placeholder}</span>
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
            ⌘K
          </kbd>
        </button>
      ) : (
        <div
          onClick={handleOpen}
          className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg cursor-text hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 ${buttonClassName}`}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <span className="flex-1 text-gray-500">{placeholder}</span>
        </div>
      )}

      <div className={`absolute z-50 w-full min-w-[400px] ${positionClasses[popoverPosition]}`}>
        <CommandPalettePopover
          isOpen={isOpen}
          onChangeOpen={setIsOpen}
          search={search}
          onChangeSearch={setSearch}
          selected={selected}
          onChangeSelected={setSelected}
          renderLink={renderLink}
          placeholder={placeholder}
          page={page}
          footer={footer}
          className={`max-h-[400px] ${popoverClassName}`}
        >
          {children}
        </CommandPalettePopover>
      </div>
    </div>
  );
}

SearchWithCommandPalette.Page = CommandPalettePopover.Page;
SearchWithCommandPalette.List = CommandPalettePopover.List;
SearchWithCommandPalette.ListItem = CommandPalettePopover.ListItem;
SearchWithCommandPalette.Icon = CommandPalettePopover.Icon;
SearchWithCommandPalette.FreeSearchAction = CommandPalettePopover.FreeSearchAction;

export default SearchWithCommandPalette;