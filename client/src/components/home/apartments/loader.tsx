export default function ApartmentLoader() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border border-slate-300 rounded-xl col-span-6 lg:col-span-3 xl:col-span-2 h-120"
        >
          <div className="w-full h-70 rounded-t-xl animate-pulse bg-slate-300"></div>
          <div className="p-4">
            <div className="bg-slate-400 w-1/3 h-10 rounded-lg animate-pulse"></div>
            <div className="bg-slate-300 w-1/2 h-10 rounded-lg my-2 animate-pulse"></div>
            <div className="bg-slate-200 w-1/4 h-10 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
