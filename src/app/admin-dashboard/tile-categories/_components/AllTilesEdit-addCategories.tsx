"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { AllTilesCategoriesDataType } from "./AllTilesCategoriesData"

// Form validation schema
const formSchema = z.object({
  categoryName: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface AddTileEditCategoriesProps {
  category: AllTilesCategoriesDataType | null
  onCancel: () => void
}

export default function AddTileEditAndAddCategories({ category, onCancel }: AddTileEditCategoriesProps) {
  const isEditing = !!category

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: category ? category.CategoriesName : "",
      description: "", // Assuming description would be added to your data model
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("FormData:", data)
    // Add your submission logic here
    // If editing: update the category
    // If adding: create a new category
    onCancel() // Close form after submission
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold leading-tight">
            {isEditing ? "Edit Tile Category" : "Add Tile Categories"}
          </h2>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/admin-dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href="/admin-dashboard/tile-categories"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tile Categories
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{isEditing ? "Edit Category" : "Add Categories"}</span>
          </nav>
        </div>
        <div className="">
        <Button  size="icon" onClick={onCancel} className="h-11 w-20">
          <ArrowLeft className="h-5 w-5" />Back
        </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="category-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type category name here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type category description here..."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit">{isEditing ? "Update" : "Submit"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

