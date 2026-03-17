type Brand = {
  blue: string;
  blueDeep: string;
  blueSoft: string;
  orange: string;
  orangeDeep: string;
  orangeSoft: string;
  ink: string;
  slate: string;
  cream: string;
  white: string;
  border: string;
  shadow: string;
};

const bondBuckets = [
  {
    title: "Treasuries",
    text: "Treasuries generally form the core of the bond allocation. They are used across a range of maturities and are relied upon for stability and capital preservation.",
  },
  {
    title: "International Bonds",
    text: "International bonds can add diversification beyond the U.S. bond market and reduce reliance on any single government or interest-rate environment.",
  },
  {
    title: "Corporate Bonds",
    text: "Corporate bonds can add income and broaden the fixed-income opportunity set, while still serving a stabilizing role within the bond portfolio.",
  },
  {
    title: "Municipal Bonds",
    text: "Municipal bonds may be appropriate in taxable accounts for higher earners, where tax-exempt income can improve after-tax results.",
  },
];

export default function BondDiversificationPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="bond-diversification"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      <div className="mb-2 text-lg font-medium">
        The bond side of a portfolio deserves structure too
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Bond diversification
      </div>

      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.blueSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.blueDeep }}>
          Treasuries are typically the anchor, with other bond categories used where appropriate
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          Roughly half of the bond allocation may be held in Treasuries across a range of maturities, with the other half potentially diversified among international bonds, corporate bonds, and municipal bonds when appropriate.
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {bondBuckets.map((bucket) => (
          <div
            key={bucket.title}
            className="rounded-xl p-5"
            style={{ background: brand.blueSoft }}
          >
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>
              {bucket.title}
            </div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
              {bucket.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Duration matters</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            When long Treasuries appear attractively priced and rates are more likely to trend down, the portfolio can lean more in that direction. When long Treasuries appear expensive and rates are more likely to trend up, the portfolio can lean shorter.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why broaden beyond Treasuries</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            As national debt levels continue to rise, the bond allocation can be broadened with international and corporate exposure, while municipal bonds may serve taxable high earners particularly well.
          </div>
        </div>
      </div>

      <div className="text-base font-medium">
        Bond diversification is not about complexity for its own sake — it is about creating a more resilient fixed-income structure.
      </div>
    </div>
  );
}