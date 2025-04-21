import ApartmentForm from '@/components/apartment/apartment-form';
import Title from '@/components/shared/title';

export default function AddApartment() {
  return (
    <main className="container my-10">
      <Title title="Add New Apartment" />
      <ApartmentForm />
    </main>
  );
}
