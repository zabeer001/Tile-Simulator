"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { ColumnDef } from "@tanstack/react-table"
import type { AllTilesCategoriesDataType } from "./AllTilesCategoriesData"
import ActionsButton from "./ActionsButton"

interface ColumnProps {
  onEdit: (category: AllTilesCategoriesDataType) => void
  onDelete: (color: AllTilesCategoriesDataType) => void
}

export const createAllTilesCategoriesColumn = ({ onEdit, onDelete }: ColumnProps): ColumnDef<AllTilesCategoriesDataType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Categories Name",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-[2px]">
          <span className="text-base font-normal text-black leading-[120%] text-center">
            {row.original.CategoriesName}
          </span>
        </div>
      )
    },
  },
  {
    header: "Count",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-[2px]">
          <span className="text-base font-normal text-black leading-[120%] text-center">{row.original.Count}</span>
        </div>
      )
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-[2px]">
          <span className="text-base font-normal text-black leading-[120%] text-center">{row.original.Date}</span>
        </div>
      )
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <ActionsButton row={row} onEdit={onEdit} onDelete={onDelete}/>
        </div>
      )
    },
  },
]

