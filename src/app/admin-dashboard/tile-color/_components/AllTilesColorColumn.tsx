"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { ColumnDef } from "@tanstack/react-table"
import type { AllTilesColorDataType } from "./AllTilesColorData"
import ActionsButton from "./ActionsButton"
import Image from "next/image"

interface ColumnProps {
  onEdit: (color: AllTilesColorDataType) => void
  onDelete: (color: AllTilesColorDataType) => void
}

export const createAllTilesColorColumn = ({ onEdit, onDelete }: ColumnProps): ColumnDef<AllTilesColorDataType>[] => [
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
    header: "Color Name",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-[2px]">
          <span className="text-base font-normal text-black leading-[120%] text-center">{row.original.Name}</span>
        </div>
      )
    },
  },
  {
    header: "Preview",
    cell: ({ row }) => {
      const isColor = row.original.imageOrColor?.startsWith("#")

      return (
        <div className="flex justify-center items-center">
          {isColor ? (
            <div
              className="w-12 h-12 rounded-md border border-gray-300"
              style={{ backgroundColor: row.original.imageOrColor || "#ccc" }}
            />
          ) : (
            <div className="w-12 h-12 rounded-md overflow-hidden">
              <Image
                src={row.original.imageOrColor || "/placeholder.svg"}
                alt={row.original.Name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      )
    },
  },
  {
    header: "Type",
    cell: ({ row }) => {
      const isColor = row.original.imageOrColor?.startsWith("#")
      return (
        <div className="flex justify-center items-center gap-[2px]">
          <span className="text-base font-normal text-black leading-[120%] text-center">
            {isColor ? "Color" : "Image"}
          </span>
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
          <ActionsButton row={row} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )
    },
  },
]

