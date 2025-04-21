'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { postData } from '@/lib/actions';
import { LoaderCircle } from 'lucide-react';

type Name =
  | 'unitName'
  | 'unitNumber'
  | 'project'
  | 'location'
  | 'price'
  | 'area'
  | 'bedRooms'
  | 'bathRooms'
  | 'description';

const formSchema = z.object({
  unitName: z.string().min(3),
  unitNumber: z.coerce.number().min(1),
  project: z.string().min(3),
  location: z.string().min(3),
  price: z.coerce.number().min(500000),
  area: z.coerce.number().min(10),
  bedRooms: z.coerce.number().int().min(1),
  bathRooms: z.coerce.number().int().min(1),
  description: z.string().optional(),
  images: z
    .custom<File[]>()
    .refine((files) => files.length > 0, 'At least one image is required'),
});

export default function ApartmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitName: '',
      unitNumber: 1,
      project: '',
      location: '',
      area: 10,
      bedRooms: 1,
      bathRooms: 1,
      price: 500000,
      description: '',
      images: [],
    },
  });
  const mutation = useMutation({
    mutationFn: (data) => postData({ url: 'apartment', data: data }),
    onSuccess: (data) => {
      toast('Great', {
        description: data.message || 'Apartment created successfully',
        style: {
          backgroundColor: 'green',
          color: 'white',
          fontSize: '18px',
        },
      });
      form.reset();
    },
    onError: (err) => {
      toast('Error', {
        description: err.message || 'something went wrong',
        style: {
          backgroundColor: 'red',
          color: 'white',
          fontSize: '18px',
        },
      });
    },
  });

  function onSubmit(values: any) {
    mutation.mutate(values);
  }
  const fields: {
    label: string;
    name: Name;
    type: 'text' | 'number';
  }[] = [
    {
      name: 'unitName',
      label: 'Unit Name',
      type: 'text',
    },
    {
      name: 'unitNumber',
      label: 'Unit Number',
      type: 'number',
    },
    {
      name: 'project',
      label: 'Project',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
    },
    {
      name: 'area',
      label: 'Area',
      type: 'number',
    },
    {
      name: 'bedRooms',
      label: 'Bed Rooms',
      type: 'number',
    },
    {
      name: 'bathRooms',
      label: 'Bath Rooms',
      type: 'number',
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 gap-y-8 lg:max-w-2/3 mx-auto"
      >
        {fields.map((itm) => (
          <FormField
            key={itm.name}
            control={form.control}
            name={itm.name as Name}
            render={({ field }) => (
              <FormItem className="md:col-span-1 col-span-2 relative">
                <FormLabel className="text-xl">{itm.label}</FormLabel>
                <FormControl>
                  <Input
                    type={itm.type}
                    placeholder={itm.label}
                    {...field}
                    className="focus-visible:ring-0 !text-xl !px-3 !py-5 border-primary"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-5" />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2 relative">
              <FormLabel className="text-xl">Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="focus-visible:ring-0 !text-xl max-h-30 border-primary"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="col-span-2 relative">
              <FormLabel className="text-xl">Apartment Images</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files);
                  }}
                  className="col-span-2 border border-primary border-dashed rounded-lg px-5 py-8 text-xl text-primary cursor-pointer"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5" />
            </FormItem>
          )}
        />

        <Button type="submit" className=" text-xl !px-4 !py-5">
          Add
          {mutation.isPending && (
            <LoaderCircle className="animate-spin text-white " />
          )}
        </Button>
      </form>
    </Form>
  );
}
