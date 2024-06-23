"use client";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RotateCcw, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
  DrawerCheckboxItem,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query"; // Import the useMediaQuery hook

type Checked = DropdownMenuCheckboxItemProps["checked"];

const fontTypes = [
  { label: "전체" },
  { label: "Sans" },
  { label: "Serif" },
  { label: "Mono" },
  { label: "Display" },
  { label: "Script" },
  { label: "Handwriting" },
  { label: "Decorative" },
  { label: "Experimental" },
];

// Action types
const TOGGLE_OPTION = "TOGGLE_OPTION";
const RESET_OPTIONS = "RESET_OPTIONS";

// State type
type State = {
  [key: string]: boolean;
};

// Reducer function
function reducer(
  state: State,
  action: { type: string; option?: string; value?: boolean },
): State {
  switch (action.type) {
    case TOGGLE_OPTION:
      return {
        ...state,
        [action.option!]: action.value!,
      };
    case RESET_OPTIONS:
      return Object.keys(state).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as State);
    default:
      return state;
  }
}

export default function CategorySelector() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Initial state based on fontTypes
  const initialState: State = fontTypes.reduce((acc, fontType) => {
    acc[`show${fontType.label}`] = false;
    return acc;
  }, {} as State);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectedItems = fontTypes
    .filter((fontType) => state[`show${fontType.label}`])
    .map((fontType) => fontType.label);

  const selectedItemsText =
    selectedItems.length > 2
      ? `${selectedItems.slice(0, 2).join(", ")}`
      : selectedItems.join(", ");

  const moreItemsCount = selectedItems.length - 2;

  const handleReset = () => {
    dispatch({ type: RESET_OPTIONS });
  };

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center space-x-1">
            <p className="font-semibold text-neutral-900">카테고리</p>
            <p className="font-medium text-neutral-700">
              {selectedItemsText}
              {moreItemsCount > 0 && (
                <span className="text-neutral-500">
                  {" +"}
                  {moreItemsCount}
                  {" more"}
                </span>
              )}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>카테고리 선택</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {fontTypes.map((fontType) => (
            <DropdownMenuCheckboxItem
              key={fontType.label}
              checked={state[`show${fontType.label}`]}
              onCheckedChange={(checked) =>
                dispatch({
                  type: TOGGLE_OPTION,
                  option: `show${fontType.label}`,
                  value: checked,
                })
              }
            >
              {fontType.label}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem keepOpenOnSelect={true}>
            <Button
              onClick={handleReset}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              초기화
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="flex items-center space-x-1">
          <p className="font-semibold text-neutral-900">카테고리</p>
          <p className="font-medium text-neutral-700">
            {selectedItemsText}
            {moreItemsCount > 0 && (
              <span className="text-neutral-500">
                {" +"}
                {moreItemsCount}
                {" more"}
              </span>
            )}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>카테고리 선택</DrawerTitle>
          <DrawerDescription>여러 개를 고를 수 있어요</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 px-4 pb-4">
          {fontTypes.map((fontType) => (
            <DrawerCheckboxItem
              key={fontType.label}
              checked={state[`show${fontType.label}`]}
              onCheckedChange={(checked) =>
                dispatch({
                  type: TOGGLE_OPTION,
                  option: `show${fontType.label}`,
                  value: checked,
                })
              }
            >
              {fontType.label}
            </DrawerCheckboxItem>
          ))}
        </div>
        <DrawerFooter className="pt-2 flex-row h-16">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="w-48 h-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            초기화
          </Button>
          <DrawerClose className="h-full w-full" asChild>
            <Button variant="default" className="w-full">
              확인
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
