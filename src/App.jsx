import { useState } from "react";
import data from "./data/statData.json";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedIndicator, setSelectedIndicator] = useState("All");

  const years = [...new Set(data.map((item) => item.year))].sort(
    (a, b) => b - a,
  );
  const regions = [...new Set(data.map((item) => item.region))].sort();
  const indicators = [...new Set(data.map((item) => item.indicator))].sort();

  const filteredData = data
    .filter((item) => {
      const matchesYear =
        selectedYear === "All" || item.year === Number(selectedYear);
      const matchesRegion =
        selectedRegion === "All" || item.region === selectedRegion;
      const matchesIndicator =
        selectedIndicator === "All" || item.indicator === selectedIndicator;

      return matchesYear && matchesRegion && matchesIndicator;
    })
    .sort((a, b) => b.value - a.value);

  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
  const avgValue = filteredData.length
    ? Math.round(totalValue / filteredData.length)
    : 0;
  const maxItem = filteredData.length ? filteredData[0] : null;

  const chartData = {
    labels: filteredData.map((item) => item.region),
    datasets: [
      {
        label:
          selectedIndicator === "All" ? "Indicator value" : selectedIndicator,
        data: filteredData.map((item) => item.value),
        backgroundColor: "#2563eb",
        borderRadius: 10,
        maxBarThickness: 48,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  const handleResetFilters = () => {
    setSelectedYear("2024");
    setSelectedRegion("All");
    setSelectedIndicator("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200">
              Demo MVP
            </span>
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200">
              Public statistics concept
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stat Data Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
              A simple frontend MVP for exploring statistical data by year,
              region, and indicator.
            </p>
          </div>
        </header>

        <section className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Filters</h2>
              <p className="text-sm text-slate-500">
                Choose a year, region, and indicator to update all widgets.
              </p>
            </div>

            <button
              onClick={handleResetFilters}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Reset filters
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Indicator
              </label>
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All indicators</option>
                {indicators.map((indicator) => (
                  <option key={indicator} value={indicator}>
                    {indicator}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Average value</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {avgValue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Highest region</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {maxItem ? maxItem.region : "—"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {maxItem ? maxItem.value.toLocaleString() : "No data"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Records count</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {filteredData.length}
            </p>
          </div>
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Regional comparison</h2>
              <p className="text-sm text-slate-500">
                Main chart based on selected filters.
              </p>
            </div>

            {filteredData.length === 0 ? (
              <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500">
                No chart data available for current filters.
              </div>
            ) : (
              <div className="h-[320px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Current selection</h2>
              <p className="text-sm text-slate-500">
                Active filter state for this dashboard.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Year
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedYear}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Region
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedRegion}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Indicator
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedIndicator}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Data table</h2>
              <p className="text-sm text-slate-500">
                Filtered records sorted by value.
              </p>
            </div>

            <div className="text-sm text-slate-500">
              {filteredData.length} result{filteredData.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-base font-medium text-slate-700">
                No results match your current filters.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try changing the year, region, or indicator selection.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Region</th>
                    <th className="px-4 py-3 font-semibold">Year</th>
                    <th className="px-4 py-3 font-semibold">Indicator</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={`${item.region}-${item.year}-${item.indicator}-${index}`}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {item.region}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{item.year}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.indicator}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {item.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-6 text-sm text-slate-500">
          Source: demo mock data for MVP presentation.
        </footer>
      </div>
    </div>
  );
}

export default App;
