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

export default function StockDiversificationPanel({ brand }: { brand: Brand }) {
  return (
    <div className="mt-6 rounded-[1.5rem] p-6" style={{ background: brand.white, boxShadow: brand.shadow }}>
      <div className="mb-2 text-lg font-medium">Diversification helps reduce reliance on any single part of the market</div>
      <div className="mb-4 text-2xl font-semibold">Stock diversification: broad exposure across categories</div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
          <div className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>Large Value</div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
              Established companies trading at more modest valuations, often with dividends and steadier earnings profiles.
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>Large Growth</div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
              Large companies expected to grow faster than average, often trading at higher valuations.
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>Small Value</div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
              Smaller companies with lower valuations, historically associated with higher long-term return potential and higher volatility.
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>Small Growth</div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
              Smaller companies pursuing rapid growth, typically with higher volatility and less predictable outcomes.
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
          <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>International</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Companies outside the U.S., providing exposure to different economies, currencies, and valuation cycles.
          </div>
        </div>
      </div>

      <div className="mb-4 text-base font-medium">
        Different categories lead at different times. No single category consistently outperforms year after year.
      </div>

      <div className="mb-4 text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
        Portfolios concentrated in one area—such as large growth—can feel comfortable when that area is leading, but can become vulnerable when leadership changes.
      </div>

      <div className="text-sm md:text-base" style={{ color: brand.slate }}>
        FinancialFamilies builds portfolios across multiple stock categories to improve consistency and reduce dependence on any single market segment.
      </div>
    </div>
  );
}