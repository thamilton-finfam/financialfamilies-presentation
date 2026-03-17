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

const locationBuckets = [
  {
    title: "Roth IRAs",
    text: "Roth accounts are often a strong location for stocks and higher-growth assets because future qualified growth and withdrawals can be tax-free.",
  },
  {
    title: "Traditional IRAs",
    text: "Traditional IRAs are often a natural home for bonds, where ordinary income treatment is less problematic and the account can help stabilize the portfolio.",
  },
  {
    title: "Taxable Accounts",
    text: "Taxable accounts can be a good place for municipal bonds or lower-income stock exposure, helping improve liquidity and after-tax efficiency.",
  },
];

export default function AssetLocationTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="asset-location"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      <div className="mb-2 text-lg font-medium">
        Good investing is not only about what you own, but where you own it
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Asset location: placing investments in the right accounts
      </div>

      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.blueSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.blueDeep }}>
          Different account types serve different jobs
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          The goal is not just tax efficiency today. The goal is to create a household balance
          that supports growth, stability, liquidity, and favorable tax options over time.
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {locationBuckets.map((bucket) => (
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
          <div className="mb-2 font-semibold">Why taxable accounts matter</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Many families underbuild taxable accounts and later discover they lack liquidity
            when cash is needed for major purchases, transitions, or unexpected opportunities.
            Taxable assets can provide practical access without forcing every decision through
            retirement-account rules.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why Roth and traditional balance matters</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            A healthy balance between traditional and Roth accounts can create better withdrawal
            options later. That flexibility can help manage taxes year by year instead of being
            trapped in only one type of tax treatment.
          </div>
        </div>
      </div>

      <div className="text-base font-medium">
        Asset location helps turn a collection of accounts into a coordinated household strategy.
      </div>
    </div>
  );
}