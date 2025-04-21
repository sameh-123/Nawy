'use client';
import { Apartment, Query } from '@/lib/types';
import ApartmentCard from './apartment-card';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/lib/actions';
import ApartmentLoader from './loader';
import PaginationContainer from '@/components/shared/pagination';

export default function ApartmentsContainer({ params }: { params: Query }) {
  const {
    page = 1,
    priceFrom = 0,
    priceTo = 0,
    areaFrom = 0,
    areaTo = 0,
    unitName = '',
    project = '',
    unitNumber = 0,
  } = params;
  let url = `apartment?page=${page}`;
  if (priceFrom) url += `&priceFrom=${priceFrom}`;
  if (priceTo) url += `&priceTo=${priceTo}`;
  if (areaFrom) url += `&areaFrom=${areaFrom}`;
  if (areaTo) url += `&areaTo=${areaTo}`;
  if (unitName) url += `&unitName=${unitName}`;
  if (unitNumber) url += `&unitNumber=${unitNumber}`;
  if (project) url += `&project=${project}`;
  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: [
      'apartments',
      page,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      unitName,
      project,
      unitName,
    ],
    queryFn: () => getData({ url }),
  });
  if (isError) throw new Error(error.message);
  if (isLoading || isPending) return <ApartmentLoader />;
  const apartments: Apartment[] = data?.data?.data || [];
  const pagination = data?.data?.pagination;
  if (!apartments || apartments.length == 0)
    return (
      <div className="text-2xl text-primary font-semibold italic text-center my-8">
        ! No Apartments Available
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {apartments.map((apartmet) => (
          <ApartmentCard apartment={apartmet} key={apartmet._id} />
        ))}
      </div>
      {pagination && pagination.lastPage > 1 ? (
        <PaginationContainer total={pagination.lastPage} />
      ) : null}
    </>
  );
}
