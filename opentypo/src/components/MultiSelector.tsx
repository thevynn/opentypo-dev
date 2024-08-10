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

type Checked = DropdownMenuCheckboxItemProps["checked"];

type Item = {
  label: string;
};

type MultiSelectorProps = {
  items: Item[];
  label: string;
  icon: React.ReactNode;
  onSelectionChange: (selectedItems: string[]) => void;
};

const TOGGLE_OPTION = "TOGGLE_OPTION";
const RESET_OPTIONS = "RESET_OPTIONS";

type State = {
  [key: string]: boolean;
};

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
        acc[key] = true;
        return acc;
      }, {} as State);
    default:
      return state;
  }
}



export default function MultiSelector({
  items,
  label,
  icon,
  onSelectionChange,
}: MultiSelectorProps) {
  const initialState: State = items.reduce((acc, item) => {
    acc[`show${item.label}`] = true;
    return acc;
  }, {} as State);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectedItems = items
    .filter((item) => state[`show${item.label}`])
    .map((item) => item.label);

  const selectedItemsText =
    selectedItems.length === items.length
      ? "전체"
      : selectedItems.length > 2
        ? `${selectedItems.slice(0, 2).join(", ")}`
        : selectedItems.join(", ");

  const moreItemsCount = selectedItems.length - 2;

  const handleReset = () => {
    dispatch({ type: RESET_OPTIONS });
  };

  React.useEffect(() => {
    const selected = items
      .filter((item) => state[`show${item.label}`])
      .map((item) => item.label);
    onSelectionChange(selected);
  }, [state, items, onSelectionChange]);

  React.useEffect(() => {
  console.log(`MultiSelector (${label}) - Selected items:`, selectedItems);
  const selected = items
    .filter((item) => state[`show${item.label}`])
    .map((item) => item.label);
  console.log(`MultiSelector (${label}) - Emitting selection:`, selected);
  onSelectionChange(selected);
}, [state, items, onSelectionChange, label]);
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center space-x-1">
          {icon}
          <p className="font-semibold text-neutral-900">{label}</p>
          <p className="font-semibold text-neutral-500">
            {selectedItemsText}
            {moreItemsCount > 0 && selectedItems.length !== items.length && (
              <span className="text-neutral-400">
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
        <DropdownMenuLabel>{label} 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.label}
            checked={state[`show${item.label}`]}
            keepOpenOnSelect={true}
            onCheckedChange={(checked) =>
              dispatch({
                type: TOGGLE_OPTION,
                option: `show${item.label}`,
                value: checked,
              })
            }
          >
            {item.label}
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
