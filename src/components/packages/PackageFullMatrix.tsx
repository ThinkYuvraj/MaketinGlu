import { FeatureCategory } from '../../data/packageFeatures';
import { PackageItem } from '../../types';

interface PackageFullMatrixProps {
  categories: FeatureCategory[];
  packagesData: PackageItem[];
}

export default function PackageFullMatrix({
  categories,
  packagesData,
}: PackageFullMatrixProps) {
  const getFeatureAt = (pkgIndex: number, featIndex: number) => {
    const pkg = packagesData[pkgIndex];
    if (!pkg || !pkg.features || !pkg.features[featIndex]) {
      return { name: 'Included in scope', included: true };
    }
    return pkg.features[featIndex];
  };

  return (
    <div className="mt-8 relative rounded-3xl bg-[#0c1322]/90 border border-slate-800/90 shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
        <table className="w-full text-left border-collapse min-w-[920px] table-fixed">
          <colgroup>
            <col className="w-[31%]" />
            <col className="w-[23%]" />
            <col className="w-[23%]" />
            <col className="w-[23%]" />
          </colgroup>

          <thead>
            <tr className="border-b border-slate-800">
              <th scope="col" className="p-6 bg-[#090e1a] align-bottom border-r border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase block">
                    Growth Matrix
                  </span>
                  <h4 className="text-base font-black text-white">
                    Strategic Inclusions
                  </h4>
                </div>
              </th>

              {packagesData.map((pkg) => (
                <th
                  key={pkg.id}
                  scope="col"
                  className={`p-6 align-top relative transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-cyan-950/40 to-[#0c162b] border-x-2 border-cyan-400'
                      : 'bg-[#0b1120] border-r border-slate-800/80'
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase block">
                    {pkg.highlight}
                  </span>
                  <h5 className="text-lg font-black text-white">
                    {pkg.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {pkg.priceNote}
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80">
            {categories.map((cat, catIdx) => (
              <tr key={catIdx} className="contents">
                <tr className="bg-[#080d19] border-y border-slate-800">
                  <td colSpan={4} className="py-2.5 px-6 text-left">
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs font-extrabold text-white tracking-wider uppercase">
                        {cat.title}
                      </span>
                    </div>
                  </td>
                </tr>

                {cat.rows.map((rowItem, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 border-r border-slate-800/80 bg-[#090e1a]/70">
                      <span className="text-xs font-bold text-slate-200">
                        {rowItem.featureName}
                      </span>
                    </td>

                    {/* Basic */}
                    <td className="p-4 border-r border-slate-800/80 align-middle">
                      <span className="text-xs text-slate-300">
                        {getFeatureAt(0, rowItem.featureIndex).name}
                      </span>
                    </td>

                    {/* Advance */}
                    <td className="p-4 border-x-2 border-cyan-400/80 bg-cyan-950/20 align-middle">
                      <span className="text-xs text-white font-semibold">
                        {getFeatureAt(1, rowItem.featureIndex).name}
                      </span>
                    </td>

                    {/* Pro */}
                    <td className="p-4 border-r border-slate-800/80 align-middle">
                      <span className="text-xs text-slate-200">
                        {getFeatureAt(2, rowItem.featureIndex).name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
