"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { AllTilesDataType } from "./AllTilesData";
import { Eye, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";


export const AllTilesColumn: ColumnDef<AllTilesDataType>[] = [
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
    header: "Query",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="">
          <Image src={row.original.image} alt="tile image" width={75} height={75}/>
        </div>
      );
    },
  },
  {
    header: "Query",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] flex justify-center gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.title}</span>
        </div>
      );
    },
  },
  {
    header: "Category",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] flex justify-center gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.category}</span>
        </div>
      );
    },
  },
  {
    header: "Added",
    cell: ({ row }) => {
        console.log({row})
      return (
        <div className="w-[250px] h-[44px] flex justify-center gap-[2px]">
          <span className="text-lg font-semibold leading-[21px] text-gradient text-center">{row.original.added}</span>
        </div>
      );
    },
  },

  {
    header: "Actions",
    cell: () => {
      return (
        <div className="flex items-center gap-[10px]">
            <span><Eye className="w-5 h-5"/></span>
            <span><FiEdit className="w-5 h-5"/></span>
            <span><Trash2 className="w-5 h-5"/></span>
        </div>
      );
    },
  }
];