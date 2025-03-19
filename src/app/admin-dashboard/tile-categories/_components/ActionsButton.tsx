"use client"

import { Trash2 } from "lucide-react"
import { FiEdit } from "react-icons/fi"
import type { AllTilesCategoriesDataType } from "./AllTilesCategoriesData"

interface ActionsButtonProps {
  row: {
    original: AllTilesCategoriesDataType
  }
  onEdit: (category: AllTilesCategoriesDataType) => void
}

function ActionsButton({ row, onEdit }: ActionsButtonProps) {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <button onClick={() => onEdit(row.original)}>
        <FiEdit className="w-5 h-5" />
      </button>
      <button>
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ActionsButton

