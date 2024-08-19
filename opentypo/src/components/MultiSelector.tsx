"use client";
import * as React from "react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
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

type Checked = boolean;

type MultiSelectorProps = {
  label: string;
  items: { label: string }[];
  icon: React.ReactNode;
  onSelectionChange: (selectedItems: string[]) => void;
};

export default function MultiSelector({
  label,
  items,
  icon,
  onSelectionChange,
}: MultiSelectorProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

  const selectedItemsText =
    selectedItems.length === 0
      ? "선택 안 됨"
      : selectedItems.length > 2
        ? `${selectedItems.slice(0, 2).join(", ")}`
        : selectedItems.join(", ");

  const moreItemsCount = selectedItems.length - 2;

  const handleReset = () => {
    setSelectedItems([]); // 모든 항목 선택 해제
  };

  const toggleItem = (label: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label),
    );
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" className="flex items-center space-x-1">
            {icon}
            <p className="font-semibold text-neutral-900">{label}</p>
            <p className="font-medium text-neutral-700">
              {selectedItemsText}
              {moreItemsCount > 0 && selectedItems.length !== items.length && (
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
          <DrawerHeader>
            <DrawerTitle>{label} 선택</DrawerTitle>
            <DrawerDescription>필요한 항목을 선택하세요</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-60 overflow-y-auto">
            {items.map((item) => (
              <DrawerCheckboxItem
                key={item.label}
                checked={selectedItems.includes(item.label)}
                onCheckedChange={(checked) => toggleItem(item.label, checked)}
              >
                {item.label}
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center space-x-1">
          {icon}
          <p className="font-semibold text-neutral-900">{label}</p>
          <p className="font-medium text-neutral-700">
            {selectedItemsText}
            {moreItemsCount > 0 && selectedItems.length !== items.length && (
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
        <DropdownMenuLabel>{label} 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-60 overflow-y-auto">
          {items.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.label}
              checked={selectedItems.includes(item.label)}
              keepOpenOnSelect={true}
              onCheckedChange={(checked) => toggleItem(item.label, checked)}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
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
