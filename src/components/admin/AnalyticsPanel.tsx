import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Loader2, RefreshCw } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dayKey,
  loadDailyStats,
  splitRegionKey,
  type DailyStats,
} from "../../lib/analytics";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
] as const;

function countryName(code: string): string {
  if (code === "XX") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Every day in the range, with zeros where nothing was recorded. */
function fillDays(rows: DailyStats[], days: number): DailyStats[] {
  const byDate = new Map(rows.map((r) => [r.date, r]));
  const out: DailyStats[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    out.push(
      byDate.get(key) ?? {
        date: key,
        pageViews: 0,
        anonymousViews: 0,
        visitors: 0,
        countries: {},
        regions: {},
      },
    );
  }
  return out;
}

function sumCounts(rows: Record<string, number>[]): [string, number][] {
  const total: Record<string, number> = {};
  for (const r of rows) {
    for (const [k, n] of Object.entries(r)) total[k] = (total[k] ?? 0) + n;
  }
  return Object.entries(total).sort((a, b) => b[1] - a[1]);
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-extrabold text-foreground">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function BarList({
  rows,
  total,
  empty,
}: {
  rows: { label: string; sub?: string; count: number }[];
  total: number;
  empty: string;
}) {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">{empty}</p>;
  const max = rows[0].count || 1;
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={`${r.label}-${r.sub ?? ""}`}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate font-medium text-foreground">
              {r.label}
              {r.sub && <span className="ml-1.5 text-xs text-muted-foreground">{r.sub}</span>}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {r.count} · {total ? Math.round((r.count / total) * 100) : 0}%
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(4, (r.count / max) * 100)}%`,
                background: "var(--chart-1)",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="mb-4 mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  );
}

export function AnalyticsPanel() {
  const [days, setDays] = useState<number>(30);
  const [rows, setRows] = useState<DailyStats[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await loadDailyStats(days));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const data = useMemo(() => (rows ? fillDays(rows, days) : null), [rows, days]);

  const summary = useMemo(() => {
    if (!data) return null;
    const visitors = data.reduce((n, r) => n + r.visitors, 0);
    const pageViews = data.reduce((n, r) => n + r.pageViews, 0);
    const anonymous = data.reduce((n, r) => n + r.anonymousViews, 0);
    const today = data[data.length - 1];
    const countries = sumCounts(data.map((r) => r.countries));
    const regions = sumCounts(data.map((r) => r.regions));
    return {
      visitors,
      pageViews,
      anonymous,
      todayVisitors: today?.visitors ?? 0,
      todayViews: today?.pageViews ?? 0,
      avgVisitors: days ? visitors / days : 0,
      consentedShare: pageViews ? Math.round(((pageViews - anonymous) / pageViews) * 100) : 0,
      countries,
      regions,
      locatedTotal: countries.reduce((n, [, c]) => n + c, 0),
    };
  }, [data, days]);

  const exportCsv = () => {
    if (!data) return;
    const lines = [
      "date,visitors,page_views,anonymous_page_views,top_country,top_region",
      ...data.map((r) => {
        const [topC] = sumCounts([r.countries])[0] ?? ["", 0];
        const [topR] = sumCounts([r.regions])[0] ?? ["", 0];
        const region = topR ? splitRegionKey(topR).region : "";
        return [
          r.date,
          r.visitors,
          r.pageViews,
          r.anonymousViews,
          topC ? countryName(topC) : "",
          region,
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",");
      }),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `malloya-visitors-${dayKey()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = (data ?? []).map((r) => ({
    date: r.date.slice(5), // MM-DD
    Visitors: r.visitors,
    "Page views": r.pageViews,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Visitors &amp; Regions</h2>
          <p className="text-xs text-muted-foreground">
            Days are counted in South African time (SAST).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-lg border border-border">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                className={`px-3 py-1.5 text-xs font-medium ${
                  days === r.days
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={!data}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-60"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {error}
          {/permission|insufficient/i.test(error) && (
            <span className="mt-1 block">
              Firestore is refusing the read. Publish the <code>analytics_daily</code> rules from
              the setup instructions, then refresh.
            </span>
          )}
        </div>
      )}

      {!data || !summary ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Visitors today"
              value={summary.todayVisitors.toLocaleString()}
              hint={`${summary.todayViews.toLocaleString()} page views today`}
            />
            <StatCard
              label={`Visitors (${days} days)`}
              value={summary.visitors.toLocaleString()}
              hint="Unique per day, analytics-consenting visitors"
            />
            <StatCard
              label={`Page views (${days} days)`}
              value={summary.pageViews.toLocaleString()}
              hint="All visitors, consent or not"
            />
            <StatCard
              label="Daily average"
              value={summary.avgVisitors.toFixed(1)}
              hint={`${summary.consentedShare}% of views came from visitors who accepted analytics`}
            />
          </div>

          <Panel title="Daily traffic">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000014" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Visitors" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Page views" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel
              title="Visitors by country"
              subtitle="Based on visitors who accepted analytics cookies."
            >
              <BarList
                total={summary.locatedTotal}
                empty="No location data yet. It appears once visitors accept analytics."
                rows={summary.countries.slice(0, 10).map(([code, count]) => ({
                  label: countryName(code),
                  sub: code === "XX" ? undefined : code,
                  count,
                }))}
              />
            </Panel>
            <Panel
              title="Visitors by region / province"
              subtitle="Based on visitors who accepted analytics cookies."
            >
              <BarList
                total={summary.locatedTotal}
                empty="No region data yet. It appears once visitors accept analytics."
                rows={summary.regions.slice(0, 10).map(([key, count]) => {
                  const { country, region } = splitRegionKey(key);
                  return { label: region, sub: countryName(country), count };
                })}
              />
            </Panel>
          </div>

          <Panel title="Day by day">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Visitors</th>
                    <th className="py-2 pr-4 font-medium">Page views</th>
                    <th className="py-2 pr-4 font-medium">Anonymous views</th>
                    <th className="py-2 font-medium">Top region</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data].reverse().map((r) => {
                    const top = sumCounts([r.regions])[0];
                    const topLabel = top
                      ? `${splitRegionKey(top[0]).region} (${top[1]})`
                      : "—";
                    return (
                      <tr key={r.date} className="border-b border-border/60 last:border-0">
                        <td className="py-2 pr-4 font-medium text-foreground">{r.date}</td>
                        <td className="py-2 pr-4">{r.visitors}</td>
                        <td className="py-2 pr-4">{r.pageViews}</td>
                        <td className="py-2 pr-4">{r.anonymousViews}</td>
                        <td className="py-2 text-muted-foreground">{topLabel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>

          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong>How to read this:</strong> “Page views” counts everyone, using an anonymous
            total with no cookie or identifier. “Visitors” and the country/province breakdowns
            only include people who clicked <em>Accept all</em> or switched on Analytics in the
            cookie popup, so they will be lower than real traffic. Admin pages are never counted.
          </p>
        </>
      )}
    </div>
  );
}