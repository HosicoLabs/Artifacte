function FirstSection() {
  const DETAILS = [
    {
      value: "$1B+",
      title: "Asset value listed",
      desc: "Representing the cumulative value of assets presented across curated listings.",
    },
    {
      value: "$100M+",
      title: "Auction volume completed",
      desc: "Generated through confirmed transactions and successfully closed sales.",
    },
    {
      value: "10,000+",
      title: "Active participants",
      desc: "Including collectors and asset owners engaged across the platform.",
    },
  ];
  return (
    <section className="py-20 pr-10">
      <div className="pl-10 mb-10">
        <p className="uppercase font-inter font-medium text-[18px] opacity-60">
          key metrics
        </p>
        <h2 className="font-medium text-[40px] capitalize">
          platform at a glance
        </h2>
      </div>

      <div className="flex gap-10 ">
        <div
          className="relative bg-cover bg-no-repeat grow"
          style={{
            background: "url(/img/home-key-metrices.png)",
          }}
        >
          <div className=" p-10 flex flex-col justify-end h-full">
            <p className="text-[36px] leading-[130%] text-white mb-15 capitalize max-w-[18em]">
              Built for assets that require confidence, discretion, and
              long-term perspective — not short-term speculation.
            </p>

            <p className="text-white text-xl capitalize">broollyn simmons</p>
            <p className="text-white text-xl opacity-75 capitalize">
              on twitter
            </p>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-[#d9d9d9] basis-1/4">
          {DETAILS.map((item, i) => {
            return (
              <div key={i} className=" py-8">
                <p className="text-[64px] mb-3">{item.value}</p>
                <p className="mb-3 font-medium text-2xl">{item.title}</p>
                <p className="font-light text-xl">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SecondSection() {
  return (
    <section>
      <h2>second section</h2>
    </section>
  );
}

export default function HomeKeyMetrices() {
  return (
    <>
      <FirstSection />
      <SecondSection />
    </>
  );
}
