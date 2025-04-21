'use client';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
  const search = useSearchParams();
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [areaRange, setAreaRange] = useState([10.0, 500.0]);
  const [unitName, setUnitName] = useState('');
  const [unitNumber, setUnitNumber] = useState(0);
  const [project, setProject] = useState('');

  const handleClick = () => {
    const params = new URLSearchParams(search.toString());
    params.delete('page');
    if (unitName) params.set('unitName', unitName);
    else params.delete('unitName');

    if (unitNumber) params.set('unitNumber', String(unitNumber));
    else params.delete('unitNumber');

    if (project) params.set('project', project);
    else params.delete('project');

    if (priceRange[0] > 500000) params.set('priceFrom', String(priceRange[0]));
    else params.delete('priceFrom');

    if (priceRange[1] < 10000000) params.set('priceTo', String(priceRange[1]));
    else params.delete('priceTo');

    if (areaRange[0] > 10) params.set('areaFrom', String(areaRange[0]));
    else params.delete('areaFrom');

    if (areaRange[1] < 500) params.set('areaTo', String(areaRange[1]));
    else params.delete('areaTo');

    router.push(`?${params.toString()}`, { scroll: true });
  };
  return (
    <div className="my-8 flex items-center justify-center gap-8 flex-wrap border border-slate-200 rounded-lg shadow-xl p-4">
      <Input
        name="unit name"
        placeholder="unit name..."
        onChange={(e) => {
          setUnitName(e.target.value);
        }}
        className="max-w-50 focus-visible:ring-primary focus-visible:ring-1"
      />
      <Input
        name="unit number"
        placeholder="unit number..."
        // value={unitNumber}
        onChange={(e) => {
          setUnitNumber(Number(e.target.value));
        }}
        type="number"
        min={0}
        className="max-w-50 focus-visible:ring-primary focus-visible:ring-1"
      />
      <Input
        placeholder="project..."
        onChange={(e) => {
          setProject(e.target.value);
        }}
        className="max-w-50 focus-visible:ring-primary focus-visible:ring-1"
      />

      <div className="flex flex-col items-center">
        <h2 className="font-semibold">Area Range</h2>
        <div className="flex items-center gap-1">
          10{' '}
          <span>
            m<sup>2</sup>
          </span>{' '}
          <Slider
            defaultValue={[10, 500]}
            max={500}
            min={10}
            step={0.5}
            className="w-50"
            onValueChange={(value) => {
              setAreaRange(value);
            }}
          />{' '}
          500{' '}
          <span>
            m<sup>2</sup>
          </span>
        </div>
        <div className="font-bold">
          {areaRange[0]} : {areaRange[1]}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold">Price Range</h2>
        <div className="flex items-center gap-1">
          500k{' '}
          <Slider
            defaultValue={[500000, 10000000]}
            max={10000000}
            min={500000}
            step={1}
            className="w-50"
            onValueChange={(value) => {
              setPriceRange(value);
            }}
          />{' '}
          10M
        </div>
        <div className="font-bold">
          {priceRange[0]} : {priceRange[1]}
        </div>
      </div>

      <button
        className="px-3 py-2 bg-primary text-white rounded-3xl font-semibold cursor-pointer hover:bg-primary/90"
        onClick={handleClick}
      >
        search
      </button>
    </div>
  );
}
