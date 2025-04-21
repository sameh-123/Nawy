import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Title from '@/components/shared/title';
import ApartmentsContainer from './apartments-container';
import { Query } from '@/lib/types';
import { getData } from '@/lib/actions';
import Filter from './filter';

export default async function Apartments({ params }: { params: Query }) {
  const queryClient = new QueryClient();
  const {
    page = 1,
    priceFrom = 0,
    priceTo = 0,
    areaFrom = 0,
    areaTo = 0,
    unitName = "",
    project = "",
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
  console.log(url);
  await queryClient.prefetchQuery({
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
  return (
    <section className="container mb-5">
      <Title title="Discover Apartments" />
      <Filter />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ApartmentsContainer params={params} />
      </HydrationBoundary>
    </section>
  );
}
