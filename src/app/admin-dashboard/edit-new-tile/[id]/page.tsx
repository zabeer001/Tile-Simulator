"use client";
import { useParams } from "next/navigation";
import React from "react";
import { AllTilesData } from "../../_components/AllTilesData";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tile Name must be at least 4 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 10 characters.",
  }),
  gridSelection: z.string().min(2, {
    message: "Description must be at least 10 characters.",
  }),
});

const categoryData = [
  "Pattern Collection",
  "6x6 Collection",
  "Hexagon Collection",
  "Border Collection",
  "On-Demand Collection",
  "Elite Collection",
  "Mini Hexagon Collection",
  "4x4 Collection",
  "Scale",
  "Arabesque",
  "Lola",
  "Triangle",
  "Rectangle 4x8",
  "Rectangle 2x8",
];
const category = categoryData?.map((data) => ({ value: data, label: data }));

const gridSelectionData = ["1x1", "2x2"];
const gridSelection = gridSelectionData?.map((data) => ({
  value: data,
  label: data,
}));

const EditNewTile = () => {
  const { id } = useParams();
  const filterData = AllTilesData.filter((data) => data.id === Number(id));
  console.log({ filterData });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: filterData[0].title,
      description: filterData[0].description,
      category: filterData[0].category,
      gridSelection: filterData[0]?.gridSelection,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[14px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-[120%] text-secondary-200">
                  Tile Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[40px] placeholder:text-secondary-100 placeholder:text-base placeholder:font-normal placeholder:leading-[120%] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-secondary-100 focus-visible:outline-none"
                    placeholder="Input The Tile"
                    {...field}
                  />
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
                <FormLabel className="text-base font-medium leading-[120%] text-secondary-200">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[156px] placeholder:text-secondary-100 placeholder:text-base placeholder:font-normal placeholder:leading-[120%] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-secondary-100 focus-visible:outline-none"
                    placeholder="Type category description here. . ."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            <div className="md:grid-cols-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium leading-[120%] text-secondary-200">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-[40px] placeholder:text-secondary-100 placeholder:text-base placeholder:font-normal placeholder:leading-[120%] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-secondary-100 focus-visible:outline-none border-secondary-100 focus:outline-none outline-none">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="w-[268px] bg-secondary">
                          {category?.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid-cols-1">
              <FormField
                control={form.control}
                name="gridSelection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium leading-[120%] text-secondary-200">
                      Grid Selection
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-[40px] placeholder:text-secondary-100 placeholder:text-base placeholder:font-normal placeholder:leading-[120%] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-secondary-100 focus-visible:outline-none border-secondary-100 focus:outline-none outline-none">
                          <SelectValue placeholder="Select a grid" />
                        </SelectTrigger>
                        <SelectContent className="w-[268px] bg-secondary-50">
                          {gridSelection?.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditNewTile;
