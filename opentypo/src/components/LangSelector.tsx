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
import { RotateCcw, ChevronsUpDown, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const fontTypes = [
  { label: "전체" },
  { label: "한국어" },
  { label: "영어" },
  { label: "일본어" },
];

// Action types
const TOGGLE_OPTION = "TOGGLE_OPTION";
const RESET_OPTIONS = "RESET_OPTIONS";

// State type
type State = {
  [key: string]: boolean;
};

// Reducer function (줄 번호: 19 - 31)
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
        acc[key] = true; // 모든 값을 true로 설정하여 초기화합니다.
        return acc;
      }, {} as State);
    default:
      return state;
  }
}

export default function LangSelector() {
  // Initial state based on fontTypes
  const initialState: State = fontTypes.reduce((acc, fontType) => {
    acc[`show${fontType.label}`] = true;
    return acc;
  }, {} as State);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectedItems = fontTypes
    .filter((fontType) => state[`show${fontType.label}`])
    .map((fontType) => fontType.label);

  const selectedItemsText =
    selectedItems.length === fontTypes.length
      ? "전체"
      : selectedItems.length > 2
        ? `${selectedItems.slice(0, 2).join(", ")}`
        : selectedItems.join(", ");

  const moreItemsCount = selectedItems.length - 2;

  const handleReset = () => {
    dispatch({ type: RESET_OPTIONS });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center space-x-1">
          <Languages className="h-4 w-4" />
          <p className="font-semibold text-neutral-900">언어</p>
          <p className="font-medium text-neutral-600">
            {selectedItemsText}
            {moreItemsCount > 0 &&
              selectedItems.length !== fontTypes.length && (
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
        <DropdownMenuLabel>언어 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fontTypes.map((fontType) => (
          <DropdownMenuCheckboxItem
            key={fontType.label}
            checked={state[`show${fontType.label}`]}
            keepOpenOnSelect={true}
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
