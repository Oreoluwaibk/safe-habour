const PromoBanner = () => {
  return (
    <section className="bg-[#670318] py-12 px-6 text-center text-white mt-5">
      <div className="text-lg flex flex-col gap-2">
        <h3 className="text-2xl">🎉 LAUNCH SPECIAL: First 200 Families Book FREE!</h3>
        <p>No booking fees. No charges. Just trusted care.</p>
        <div className="flex items-center gap-1 justify-center">
          <p className="text-3xl font-semibold">147</p>
          <p>of 200 spots remaining</p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
