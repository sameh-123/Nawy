import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
export default function ImagesSwiper({ images }: { images: string[] }) {
  return (
    <Carousel
      className="w-full my-10"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2">
            <div className="p-1">
              <Image
                src={image}
                alt="apartment"
                width={2000}
                height={2000}
                className="h-100 object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
        {images.map((image, index) => (
          <CarouselItem key={index + 2} className="lg:basis-1/3 md:basis-1/2">
            <div className="p-1">
              <Image
                src={image}
                alt="apartment"
                width={2000}
                height={2000}
                className="h-100 object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
