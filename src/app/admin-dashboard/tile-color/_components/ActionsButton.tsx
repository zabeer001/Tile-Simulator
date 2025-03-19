"use client"

import { Trash2 } from "lucide-react"
import { FiEdit } from "react-icons/fi"
import type { AllTilesColorDataType } from "./AllTilesColorData"

interface ActionsButtonProps {
  row: {
    original: AllTilesColorDataType
  }
  onEdit: (color: AllTilesColorDataType) => void
  onDelete?: (color: AllTilesColorDataType) => void
}

function ActionsButton({ row, onEdit, onDelete }: ActionsButtonProps) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(row.original)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(row.original)
    }
  }

  return (
    <div className="flex items-center justify-center gap-[10px]">
      <button onClick={handleEdit}>
        <FiEdit className="w-5 h-5" />
      </button>
      <button onClick={handleDelete}>
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ActionsButton

