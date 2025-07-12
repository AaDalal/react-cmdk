import FreeSearchAction from "./FreeSearchAction";
import Icon from "./Icon";
import List from "./List";
import ListItem from "./ListItem";
import Page from "./Page";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Search from "./Search";
import {
  OpenContext,
  PageContext,
  RenderLinkContext,
  SearchContext,
  SelectContext,
} from "../lib/context";
import { RenderLink } from "../types";

interface CommandPalettePopoverProps {
  onChangeSelected?: (value: number) => void;
  onChangeSearch: (search: string) => void;
  onChangeOpen: (isOpen: boolean) => void;
  renderLink?: RenderLink;
  placeholder?: string;
  children: ReactNode;
  footer?: ReactNode;
  selected?: number;
  isOpen: boolean;
  search: string;
  page?: string;
  className?: string;
  containerClassName?: string;
}

function CommandPalettePopover({
  selected: selectedParent,
  placeholder = "Search",
  onChangeSelected,
  onChangeSearch,
  onChangeOpen,
  renderLink,
  children,
  isOpen,
  footer,
  search,
  page,
  className = "",
  containerClassName = "",
}: CommandPalettePopoverProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] =
    typeof selectedParent === "number" && onChangeSelected
      ? [selectedParent, onChangeSelected]
      : useState<number>(0);

  const [searchPrefix, setSearchPrefix] = useState<string[] | undefined>();

  function handleChangeSelected(direction?: "up" | "down") {
    const items = document.querySelectorAll(".command-palette-list-item");

    let index = 0;
    let newIndex = 0;
    let newItem: Element;

    if (direction === "down") {
      items.forEach((_, i) => {
        if (i === selected) {
          index = i;
        }
      });

      newIndex = index === items.length - 1 ? 0 : index + 1;
    } else if (direction === "up") {
      items.forEach((_, i) => {
        if (i === selected) {
          index = i;
        }
      });

      newIndex = !index ? items.length - 1 : index - 1;
    } else {
      setSelected(0);
    }

    newItem = items[newIndex];

    if (newItem && typeof newIndex === "number") {
      setSelected(newIndex);
      newItem.scrollIntoView({
        behavior: "smooth",
        block: newIndex ? "center" : "end",
      });
    }
  }

  function handleSelect() {
    const items = document.querySelectorAll(
      ".command-palette-list-item"
    ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>;

    let index = 0;
    let item: HTMLAnchorElement | HTMLButtonElement;

    items.forEach((_, i) => {
      if (i === selected) {
        index = i;
      }
    });

    item = items[index];

    if (item) {
      item.click();

      if (
        item.attributes.getNamedItem("data-close-on-select")?.value === "true"
      ) {
        onChangeOpen(false);
      }
    }
  }

  useEffect(() => {
    handleChangeSelected();
  }, [search]);

  useEffect(() => {
    setSelected(0);
  }, [page]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onChangeOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onChangeOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`command-palette-popover ${containerClassName}`}
      onKeyDown={(e) => {
        if (
          e.key === "ArrowDown" ||
          (e.ctrlKey && e.key === "n") ||
          (e.ctrlKey && e.key === "j")
        ) {
          e.preventDefault();
          e.stopPropagation();
          handleChangeSelected("down");
        } else if (
          e.key === "ArrowUp" ||
          (e.ctrlKey && e.key === "p") ||
          (e.ctrlKey && e.key === "k")
        ) {
          e.preventDefault();
          e.stopPropagation();
          handleChangeSelected("up");
        } else if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          handleSelect();
        } else if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          onChangeOpen(false);
        }
      }}
    >
      <div className={`command-palette bg-white dark:bg-gray-900 shadow-lg rounded-lg flex flex-col overflow-hidden divide-y dark:divide-gray-800 ${className}`}>
        <PageContext.Provider
          value={{
            setSearchPrefix,
            searchPrefix,
            page,
          }}
        >
          <Search
            onChange={onChangeSearch}
            placeholder={placeholder}
            prefix={searchPrefix}
            value={search}
            ref={inputRef}
          />
        </PageContext.Provider>

        <div
          className="flex-1 overflow-y-auto focus:outline-none p-2 space-y-4"
          tabIndex={-1}
        >
          <OpenContext.Provider value={{ isOpen, onChangeOpen }}>
            <PageContext.Provider
              value={{ page, searchPrefix, setSearchPrefix }}
            >
              <SearchContext.Provider value={{ search }}>
                <SelectContext.Provider value={{ selected }}>
                  <RenderLinkContext.Provider
                    value={{ renderLink }}
                  >
                    {children}
                  </RenderLinkContext.Provider>
                </SelectContext.Provider>
              </SearchContext.Provider>
            </PageContext.Provider>
          </OpenContext.Provider>
        </div>

        {footer}
      </div>
    </div>
  );
}

CommandPalettePopover.Page = Page;
CommandPalettePopover.List = List;
CommandPalettePopover.ListItem = ListItem;
CommandPalettePopover.Icon = Icon;
CommandPalettePopover.FreeSearchAction = FreeSearchAction;

export default CommandPalettePopover;