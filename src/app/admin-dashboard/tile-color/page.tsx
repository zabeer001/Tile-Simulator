"use client"

import { useState } from "react"
import AllTilesColorHeader from "./_components/AllTilesColorHeader"
import AllTilesColorsCotainer from "./_components/AllTilesColorContainer"
import AddEditColor from "./_components/Add-EditColor"
import {  type AllTilesColorDataType } from "./_components/AllTilesColorData"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

const TileColors = () => {
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false)
  const [selectedColor, setSelectedColor] = useState<AllTilesColorDataType | null>(null)

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  console.log(token)

  const handleAddNew = () => {
    setSelectedColor(null)
    setIsAddingOrEditing(true)
  }

  const handleEdit = (color: AllTilesColorDataType) => {
    setSelectedColor(color)
    setIsAddingOrEditing(true)
  }

  const handleCancel = () => {
    setIsAddingOrEditing(false)
    setSelectedColor(null)
  }

  const handleSave = (color: AllTilesColorDataType) => {
    console.log(color); // Use the color value
    setIsAddingOrEditing(false)
    setSelectedColor(null)
  }


  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["colors"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colors`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (!res.ok) throw new Error("Failed to fetch tile colors")
      return res.json()
    },
  })







  return (
    <div>
      {!isAddingOrEditing && <AllTilesColorHeader onAddNew={handleAddNew} />}

      {isAddingOrEditing ? (
        <AddEditColor color={selectedColor} onCancel={handleCancel} onSave={handleSave} />
      ) : (
        <AllTilesColorsCotainer
          onEdit={handleEdit}
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      )}
    </div>
  )
}

export default TileColors

