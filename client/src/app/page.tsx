import Apartments from '@/components/home/apartments/apartments';
import { Query } from '@/lib/types';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const params = await searchParams;
  return (
    <main>
      <Apartments params={params} />
    </main>
  );
}
