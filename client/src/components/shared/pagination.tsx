'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function PaginationContainer({ total }: { total: number }) {
  const search = useSearchParams();
  const router = useRouter();
  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(search.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: true });
  };
  const page = parseInt(search.get('page') || '1');
  if (total <= 1) return null;
  return (
    <Pagination className="my-5" dir="ltr">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page != 1)
                setSearchParam('page', Math.max(1, page - 1).toString());
            }}
          />
        </PaginationItem>
        {page != 1 && page - 1 != 1 && (
          <PaginationItem
            className="border text-xl size-10 flex items-center justify-center rounded-md shadow-md text-main font-semibold cursor-pointer hover:bg-secondary"
            onClick={() => {
              setSearchParam('page', '1');
            }}
          >
            1
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page - 1 > 0 && (
          <PaginationItem
            onClick={() => {
              setSearchParam('page', (page - 1).toString());
            }}
            className="border text-xl size-10 flex items-center justify-center rounded-md shadow-md text-main font-semibold cursor-pointer hover:bg-secondary"
          >
            {page - 1}
          </PaginationItem>
        )}
        <PaginationItem className="border text-xl size-10 flex items-center justify-center rounded-md shadow-md text-white font-semibold cursor-pointer bg-primary">
          {page}
        </PaginationItem>
        {page + 1 <= total && (
          <PaginationItem
            className="border text-xl size-10 flex items-center justify-center rounded-md shadow-md font-semibold cursor-pointer hover:bg-secondary"
            onClick={() => {
              setSearchParam('page', (page + 1).toString());
            }}
          >
            {page + 1}
          </PaginationItem>
        )}

        {page < total - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page != total && page + 1 != total && (
          <PaginationItem
            className="border text-xl size-10 flex items-center justify-center rounded-md shadow-md font-semibold cursor-pointer hover:bg-secondary"
            onClick={() => {
              setSearchParam('page', total.toString());
            }}
          >
            {total}
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (page != total)
                setSearchParam('page', Math.min(total, page + 1).toString());
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
