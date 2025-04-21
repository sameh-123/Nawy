import ImagesSwiper from '@/components/apartment/images-swiper';
import Title from '@/components/shared/title';
import { getData } from '@/lib/actions';
import { Banknote, Bath, Bed, LandPlot, MapPin } from 'lucide-react';
import Image from 'next/image';

export default async function ApartmentById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getData({ url: `apartment/${id}` });
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
  } = data.data;

  return (
    <main className="container my-10">
      <Title title="Apartment Details" />
      <Image
        src={images[0]}
        alt={unitName}
        width={2000}
        height={2000}
        className="w-full h-120 object-cover rounded-lg"
      />
      <article className="mt-10 grid grid-cols-3 gap-8">
        <div className="col-span-3 sm:col-span-1">
          <h1 className="font-semibold text-4xl">{unitName}</h1>

          <h1 className="text-slate-400 text-xl font-light">
            Unit Number : #{unitNumber}
          </h1>
        </div>

        <h2 className="text-2xl my-4 col-span-3 sm:col-span-1">
          From : <span className="font-semibold">{project}</span>
        </h2>

        <div className="flex items-center gap-4 col-span-3 sm:col-span-1">
          <MapPin className="size-10 text-primary" />
          <span className="text-2xl font-bold">{location}</span>
        </div>

        {description ? (
          <p className="col-span-3 text-2xl font-extralight">{description}</p>
        ) : null}

        <div className="flex items-center gap-3 sm:text-2xl text-xl font-semibold my-2 sm:col-span-2 col-span-3">
          <div className="flex items-center gap-2">
            <Bed className="size-10 text-primary" />
            {bedRooms}
          </div>
          |
          <div className="flex items-center gap-2">
            <Bath className="size-10 text-primary" />
            {bathRooms}
          </div>
          |
          <div className="flex items-center gap-2">
            <LandPlot className="size-10 text-primary" />
            {Math.floor(area * 100) / 100}{' '}
            <span>
              m<sup>2</sup>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-2xl italic sm:col-span-1 col-span-3">
          <Banknote className="text-primary size-10" />
          {price} L.E
        </div>
      </article>

      <ImagesSwiper images={images} />
    </main>
  );
}
