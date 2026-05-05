import { useState } from "react";
import data from "./data/statData.json";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const translations = {
  en: {
    demo: "Demo MVP",
    concept: "Public statistics concept",
    title: "Stat Data Dashboard",
    subtitle:
      "A simple frontend MVP for exploring statistical data by year, region, and indicator.",
    years: "years",
    regions: "regions",
    indicators: "indicators",
    filters: "Filters",
    filtersDesc: "Choose a year, region, and indicator to update all widgets.",
    reset: "Reset filters",
    year: "Year",
    region: "Region",
    indicator: "Indicator",
    all: "All",
    allRegions: "All regions",
    averageValue: "Average value",
    averageRate: "Average rate",
    averagePopulation: "Average population",
    highestRegion: "Highest region",
    topRegion: "Top region",
    recordsCount: "Records count",
    count: "Count",
    kpi: "KPI",
    regionalComparison: "Regional comparison",
    chartDesc: "Main chart based on selected filters.",
    noChartData: "No chart data available",
    noChartDataDesc:
      "The selected filters returned no records. Reset filters or choose another indicator.",
    currentSelection: "Current selection",
    currentSelectionDesc: "Active filter state for this dashboard.",
    dataTable: "Data table",
    tableDesc: "Filtered records sorted by value.",
    result: "result",
    results: "results",
    noResults: "No results for current filters",
    noResultsDesc:
      "Try another year, region, or indicator, or reset filters to see all available mock data.",
    source: "Source: demo mock data for MVP presentation.",
    noData: "No data",
    language: "Language",
    value: "Value",
    averageSalary: "Average Salary",
    unemploymentRate: "Unemployment Rate",
    population: "Population",
  },
  ua: {
    demo: "Демо MVP",
    concept: "Концепт публічної статистики",
    title: "Статистичний дашборд",
    subtitle:
      "Простий frontend MVP для перегляду статистичних даних за роком, регіоном та індикатором.",
    years: "роки",
    regions: "регіони",
    indicators: "індикатори",
    filters: "Фільтри",
    filtersDesc: "Оберіть рік, регіон та індикатор, щоб оновити всі віджети.",
    reset: "Скинути фільтри",
    year: "Рік",
    region: "Регіон",
    indicator: "Індикатор",
    all: "Усі",
    allRegions: "Усі регіони",
    averageValue: "Середнє значення",
    averageRate: "Середній рівень",
    averagePopulation: "Середнє населення",
    highestRegion: "Найвищий показник",
    topRegion: "Топ регіон",
    recordsCount: "Кількість записів",
    count: "Кількість",
    kpi: "KPI",
    regionalComparison: "Порівняння регіонів",
    chartDesc: "Основний графік за вибраними фільтрами.",
    noChartData: "Немає даних для графіка",
    noChartDataDesc:
      "Обрані фільтри не повернули жодного запису. Скиньте фільтри або оберіть інший індикатор.",
    currentSelection: "Поточний вибір",
    currentSelectionDesc: "Активний стан фільтрів для цього дашборда.",
    dataTable: "Таблиця даних",
    tableDesc: "Відфільтровані записи, відсортовані за значенням.",
    result: "результат",
    results: "результатів",
    noResults: "Немає результатів для поточних фільтрів",
    noResultsDesc:
      "Спробуйте інший рік, регіон або індикатор, або скиньте фільтри, щоб побачити всі доступні дані.",
    source: "Джерело: демо-мок дані для презентації MVP.",
    noData: "Немає даних",
    language: "Мова",
    value: "Значення",
    averageSalary: "Середня зарплата",
    unemploymentRate: "Рівень безробіття",
    population: "Населення",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedIndicator, setSelectedIndicator] = useState("Average Salary");

  const t = (key) => translations[lang][key];

  const years = [...new Set(data.map((item) => item.year))].sort(
    (a, b) => b - a,
  );
  const regions = [...new Set(data.map((item) => item.region))].sort();
  const indicators = [...new Set(data.map((item) => item.indicator))].sort();

  const getIndicatorLabel = (indicator) => {
    const map = {
      "Average Salary": t("averageSalary"),
      "Unemployment Rate": t("unemploymentRate"),
      Population: t("population"),
    };

    return map[indicator] || indicator;
  };

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

  const getIndicatorType = (indicator) => {
    if (indicator === "Unemployment Rate") return "percent";
    if (indicator === "Average Salary") return "number";
    if (indicator === "Population") return "number";
    return "number";
  };

  const formatValue = (value, indicator) => {
    const type = getIndicatorType(indicator);

    if (type === "percent") {
      return `${Number(value).toFixed(1)}%`;
    }

    return Number(value).toLocaleString(lang === "ua" ? "uk-UA" : "en-US");
  };

  const getKpiLabel = () => {
    if (selectedIndicator === "Unemployment Rate") return t("averageRate");
    if (selectedIndicator === "Population") return t("averagePopulation");
    return t("averageValue");
  };

  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
  const avgValue = filteredData.length ? totalValue / filteredData.length : 0;
  const maxItem = filteredData.length ? filteredData[0] : null;

  const activeIndicator =
    selectedIndicator === "All"
      ? filteredData[0]?.indicator || "Indicator value"
      : selectedIndicator;

  const chartData = {
    labels: filteredData.map((item) => item.region),
    datasets: [
      {
        label: getIndicatorLabel(activeIndicator),
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
          label: (context) =>
            `${getIndicatorLabel(activeIndicator)}: ${formatValue(
              context.raw,
              activeIndicator,
            )}`,
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
          callback: (value) => {
            if (activeIndicator === "Unemployment Rate") {
              return `${value}%`;
            }
            return Number(value).toLocaleString(
              lang === "ua" ? "uk-UA" : "en-US",
            );
          },
        },
      },
    },
  };

  const handleResetFilters = () => {
    setSelectedYear("2024");
    setSelectedRegion("All");
    setSelectedIndicator("Average Salary");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-200">
                  {t("demo")}
                </span>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200">
                  {t("concept")}
                </span>
              </div>

              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("title")}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  {t("subtitle")}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {years.length} {t("years")}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {regions.length} {t("regions")}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {indicators.length} {t("indicators")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-2xl bg-white/10 p-1">
              <span className="px-2 text-xs font-medium text-slate-300">
                {t("language")}
              </span>
              <button
                onClick={() => setLang("en")}
                aria-label="Switch language to English"
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
                  lang === "en"
                    ? "bg-white text-slate-900"
                    : "text-white hover:bg-white/10"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ua")}
                aria-label="Перемкнути мову на українську"
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
                  lang === "ua"
                    ? "bg-white text-slate-900"
                    : "text-white hover:bg-white/10"
                }`}
              >
                UA
              </button>
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:shadow-md">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t("filters")}</h2>
              <p className="text-sm text-slate-500">{t("filtersDesc")}</p>
            </div>

            <button
              onClick={handleResetFilters}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {t("reset")}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {t("year")}
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">{t("all")}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {t("region")}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">{t("allRegions")}</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {t("indicator")}
              </label>
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {indicators.map((indicator) => (
                  <option key={indicator} value={indicator}>
                    {getIndicatorLabel(indicator)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {t("year")}: {selectedYear}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {t("region")}: {selectedRegion}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {t("indicator")}: {getIndicatorLabel(selectedIndicator)}
            </span>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-300">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">{getKpiLabel()}</p>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {t("kpi")}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {formatValue(avgValue, activeIndicator)}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-300">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">{t("highestRegion")}</p>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                {t("topRegion")}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {maxItem ? maxItem.region : "—"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {maxItem
                ? formatValue(maxItem.value, activeIndicator)
                : t("noData")}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-300">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">{t("recordsCount")}</p>
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                {t("count")}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {filteredData.length}
            </p>
          </div>
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {t("regionalComparison")}
              </h2>
              <p className="text-sm text-slate-500">{t("chartDesc")}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {selectedYear}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {selectedRegion}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {getIndicatorLabel(selectedIndicator)}
                </span>
              </div>
            </div>

            {filteredData.length === 0 ? (
              <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                <div className="mb-4 rounded-full bg-white p-3 shadow-sm ring-1 ring-slate-200">
                  <span className="text-lg">📊</span>
                </div>
                <p className="text-base font-semibold text-slate-800">
                  {t("noChartData")}
                </p>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  {t("noChartDataDesc")}
                </p>
              </div>
            ) : (
              <div className="h-[320px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{t("currentSelection")}</h2>
              <p className="text-sm text-slate-500">
                {t("currentSelectionDesc")}
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {t("year")}
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedYear}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {t("region")}
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedRegion}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {t("indicator")}
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {getIndicatorLabel(selectedIndicator)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:shadow-md">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t("dataTable")}</h2>
              <p className="text-sm text-slate-500">{t("tableDesc")}</p>
            </div>

            <div className="text-sm text-slate-500">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? t("result") : t("results")}
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                <span className="text-xl">📭</span>
              </div>
              <p className="text-base font-semibold text-slate-800">
                {t("noResults")}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {t("noResultsDesc")}
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {t("reset")}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{t("region")}</th>
                    <th className="px-4 py-3 font-semibold">{t("year")}</th>
                    <th className="px-4 py-3 font-semibold">
                      {t("indicator")}
                    </th>
                    <th className="px-4 py-3 font-semibold">{t("value")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={`${item.region}-${item.year}-${item.indicator}-${index}`}
                      className="border-b border-slate-100 transition hover:bg-slate-50 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {item.region}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{item.year}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {getIndicatorLabel(item.indicator)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {formatValue(item.value, item.indicator)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-6 text-sm text-slate-500">{t("source")}</footer>
      </div>
    </div>
  );
}

export default App;
