"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {  Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { AllTilesCategoriesDataType } from "./AllTilesCategoriesData";
import Link from "next/link";


export const AllTilesCategoriesColumn: ColumnDef<AllTilesCategoriesDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.CategoriesName}</span>
        </div>
      );
    },
  },
  {
    header: "Count",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.Count}</span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.Date}</span>
        </div>
      );
    },
  },

  {
    header: "Actions",
    cell: () => {
      return (
        <div className="flex items-center gap-[10px]">
            <Link href="/admin-dashboard/add-edit-categories">
            <FiEdit className="w-5 h-5" />
          </Link>
            <button><Trash2 className="w-5 h-5"/></button>
        </div>
      );
    },
  }
];