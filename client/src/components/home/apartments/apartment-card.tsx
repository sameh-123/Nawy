import { Apartment } from '@/lib/types';
import { Banknote, Bath, Bed, LandPlot, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const {
    _id,
    unitName,
    unitNumber,
    project,
    location,
    description,
    area,
    price,
    bedRooms,
    bathRooms,
    images,
  } = apartment;
  return (
    <div className="border border-slate-300 rounded-xl col-span-6 lg:col-span-3 xl:col-span-2">
      <Image
        src={images[0]}
        alt={unitName}
        width={2000}
        height={2000}
        className="w-full h-70 object-cover rounded-t-xl"
      />
      <div className="h-50 p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="sm:text-2xl text-xl font-bold">{unitName}</h2>
          <h2 className="text-slate-500 font-semibold"># : {unitNumber}</h2>
        </div>

        <div className="flex items-center gap-5">
          <h2 className="text-slate-600">
            <span className="font-semibold">From : </span>
            {project}
          </h2>
          <h2 className="flex items-center gap-1 text-slate-600">
            <MapPin className="text-primary" />
            <span className=" line-clamp-1 text-ellipsis">{location}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:text-lg font-semibold my-2">
          <div className="flex items-center gap-2">
            <Bed className="size-6 text-primary" />
            {bedRooms}
          </div>
          |
          <div className="flex items-center gap-2">
            <Bath className="size-6 text-primary" />
            {bathRooms}
          </div>
          |
          <div className="flex items-center gap-2">
            <LandPlot className="size-6 text-primary" />
            {Math.floor(area * 100) / 100}{' '}
            <span>
              m<sup>2</sup>
            </span>
          </div>
        </div>

        <h2 className="flex items-center gap-2 sm:text-xl font-semibold">
          <Banknote className="size-8 text-primary" />
          {price} L.E
        </h2>
        <Link
          href={`/apartment/${_id}`}
          className="self-end px-3 py-2 bg-primary rounded-4xl text-white font-semibold hover:bg-primary/80"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}
