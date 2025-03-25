"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { Save } from "lucide-react";
import SVGUpload from "./SVGUpload";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Tile Name must be at least 4 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  gridSelection: z.string().min(2, {
    message: "Grid Selection must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const gridSelectionData = ["1x1", "2x2"];

const AddNewTile = () => {
  const [svgData, setSvgData] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      gridSelection: "",
    },
  });

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  console.log(token)

  const { data } = useQuery<any>({
    queryKey: ['allTilesCategories'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (!res.ok) throw new Error("Failed to fetch tile colors")
      return res.json()
    },
  });

  

  const onSubmit = (data: FormValues) => {
    const formData = {
      tileName: data.name,
      description: data.description,
      category: data.category,
      gridSelection: data.gridSelection,
      svg: svgData,
    };

    toast.success("Form submitted", {
      description: "Check console for form data",
    });
    console.log("Form data:", formData);
  };

  const handleSvgChange = useCallback((newSvgData: string) => {
    setSvgData(newSvgData);
  }, []);

  return (
    <div className="pb-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 border border-[#B0B0B0] rounded-[8px] p-6">
            <div className="md:grid-cols-1 ">
              <div className="pb-[14px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-secondary-200">
                        Tile Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[40px] placeholder:text-secondary-100 focus-visible:ring-0"
                          placeholder="Input The Tile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pb-[14px]">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-secondary-200">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-[156px] placeholder:text-secondary-100 focus-visible:ring-0"
                          placeholder="Type category description here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                <div className="pb-[14px]">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-secondary-200">
                          Category
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full h-[40px] border-secondary-100">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {data?.data?.map((item: { id: string, name: string }) => (
                                <SelectItem key={item.id} value={item.name}>
                                  {item.name}
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

                <div className="pb-[14px]">
                  <FormField
                    control={form.control}
                    name="gridSelection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-secondary-200">
                          Grid Selection
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full h-[40px] border-secondary-100">
                              <SelectValue placeholder="Select a grid" />
                            </SelectTrigger>
                            <SelectContent>
                              {gridSelectionData.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
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
            </div>

            <div className="md:grid-cols-1">
              <FormLabel className="text-xl font-semibold text-[#1A1C21] leading-[120%]">
                Add Photo
              </FormLabel>
              <div className="pt-[14px]">
                <SVGUpload onUpload={handleSvgChange} />
              </div>

              {/* button  */}
              <div className="pt-10 w-full flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-white bg-primary py-3 px-8 text-base font-medium leading-[120%] rounded-[8px]"
                >
                  {" "}
                  <Save /> Save tile
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewTile;
