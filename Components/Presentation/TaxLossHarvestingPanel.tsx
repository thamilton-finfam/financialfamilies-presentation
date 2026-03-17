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

export default function TaxLossHarvestingPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="tax-loss-harvesting"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      {/* Header */}
      <div className="mb-2 text-lg font-medium">
        Turning market declines into potential tax value
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Tax-loss harvesting and long-term tax efficiency
      </div>

      {/* Highlight */}
      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.orangeSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.orangeDeep }}>
          Market declines can create tax opportunities
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          When investments temporarily decline in value, they can be sold to realize a loss,
          while maintaining market exposure through a similar investment.
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">What tax-loss harvesting does</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Realized losses can offset current or future capital gains and may also reduce
            taxable income over time. This can help improve after-tax outcomes without
            changing the overall investment strategy.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">What it does not do</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Tax-loss harvesting does not eliminate risk or guarantee savings. It is one
            component of a broader, tax-aware investment approach.
          </div>
        </div>
      </div>

      {/* Step-up section */}
      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.blueSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.blueDeep }}>
          Taxable accounts can also benefit from a step-up in cost basis
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          Highly appreciated investments held in taxable accounts may receive a step-up
          in cost basis at death, potentially eliminating capital gains tax on that growth.
          This makes taxable investing, when managed thoughtfully, a powerful long-term tool.
        </div>
      </div>

      {/* Practical takeaway */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Why this matters</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Instead of viewing market declines as purely negative, they can be used to
            create future tax flexibility and improve after-tax results over time.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How it fits into the strategy</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Tax-loss harvesting and asset location work together to help manage taxes
            across the household, rather than treating each account in isolation.
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="text-base font-medium">
        The goal is not to avoid taxes entirely — it is to manage them thoughtfully over time.
      </div>
    </div>
  );
}