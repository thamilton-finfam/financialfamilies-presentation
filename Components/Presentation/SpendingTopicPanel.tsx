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

export default function SpendingTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="spending"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      <div className="mb-2 text-lg font-medium">
        Portfolios exist to support life, not the other way around
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Spending: investing to support future goals
      </div>

      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.blueSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.blueDeep }}>
          Clients build portfolios to support future spending or giving
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          Investment portfolios are not just collections of assets. They are a resource
          intended to help fund future goals, spending needs, and charitable priorities.
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">When there is a gap</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Sometimes projected income sources such as Social Security, pensions, or other
            cash flow are not enough to fully support the spending a family intends. The
            portfolio is there to help fill that gap.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why taxes matter</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            The portfolio cannot be viewed in isolation. Withdrawals need to be coordinated
            with taxes, account type, and timing so spending can be supported as efficiently
            as possible.
          </div>
        </div>
      </div>

      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.orangeSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.orangeDeep }}>
          Spending conversations should be free from AUM conflicts
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          Because FinancialFamilies is compensated by annual retainer rather than a percentage
          of assets, portfolio spending decisions can be discussed without the conflict that
          may exist when an advisor is paid more for keeping assets under management.
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">What this changes</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Portfolio recommendations are connected to real withdrawal needs, not just
            accumulation. That means spending, gifting, and tax planning can be discussed
            as part of one coordinated strategy.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How FinancialFamilies approaches it</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Planning helps determine how much of the portfolio may be needed, when
            withdrawals should begin, and which account types may be most appropriate to draw
            from along the way.
          </div>
        </div>
      </div>

      <div className="text-base font-medium">
        The portfolio is there to support spending and giving thoughtfully over time.
      </div>
    </div>
  );
}