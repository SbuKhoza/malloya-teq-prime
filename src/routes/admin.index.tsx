import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { LogOut, Save, Plus, Trash2, Loader2, CheckCircle2, ExternalLink, RefreshCw, Mail, Phone } from "lucide-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../lib/auth-context";
import {
  defaultContent,
  loadContent,
  saveContent,
  loadQuotes,
  deleteQuote,
  type ContentDoc,
  type PageCopy,
  type FAQItem,
  type QuoteSubmission,
} from "../lib/content-service";
import type { Package } from "../data/packages";
import type { PortfolioItem } from "../data/portfolio";
import type { Review } from "../data/reviews";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "CMS — Malloya Teq Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "packages" | "portfolio" | "reviews" | "copy" | "contact" | "faq" | "quotes";

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("packages");
  const [content, setContent] = useState<ContentDoc | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, user, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin && !content) {
      loadContent().then(setContent).catch((e) => setError(String(e)));
    }
  }, [user, isAdmin, content]);

  if (loading || !user || !isAdmin || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const update = (patch: Partial<ContentDoc>) => setContent({ ...content, ...patch });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveContent(content);
      setSavedAt(Date.now());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleResetSection = (key: keyof ContentDoc) => {
    if (!confirm(`Reset ${key} to defaults? Unsaved.`)) return;
    update({ [key]: defaultContent[key] } as Partial<ContentDoc>);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "packages", label: "Packages" },
    { id: "portfolio", label: "Portfolio" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact Page" },
    { id: "faq", label: "FAQ" },
    { id: "quotes", label: "Quotes" },
    { id: "copy", label: "Page Copy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">MT</span>
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Malloya Teq CMS</div>
              <div className="text-[11px] text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-gold inline-flex items-center gap-2 !px-4 !py-2 text-xs disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save changes
            </button>
            <button
              onClick={() => signOut().then(() => navigate({ to: "/admin/login" }))}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {(savedAt || error) && (
        <div className="mx-auto max-w-7xl px-6 pt-4">
          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive">
              {error}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved at {new Date(savedAt!).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {tab === "packages" && (
          <PackagesEditor
            websitePackages={content.websitePackages}
            appPackages={content.appPackages}
            includedBenefits={content.includedBenefits}
            onChange={(patch) => update(patch)}
            onReset={(k) => handleResetSection(k)}
          />
        )}
        {tab === "portfolio" && (
          <PortfolioEditor
            items={content.portfolio}
            onChange={(portfolio) => update({ portfolio })}
            onReset={() => handleResetSection("portfolio")}
          />
        )}
        {tab === "reviews" && (
          <ReviewsEditor
            items={content.reviews}
            onChange={(reviews) => update({ reviews })}
            onReset={() => handleResetSection("reviews")}
          />
        )}
        {tab === "contact" && (
          <ContactEditor
            copy={content.copy}
            onChange={(copy) => update({ copy })}
            onReset={() => handleResetSection("copy")}
          />
        )}
        {tab === "faq" && (
          <FaqEditor
            copy={content.copy}
            faqs={content.faqs}
            onCopyChange={(copy) => update({ copy })}
            onChange={(faqs) => update({ faqs })}
            onReset={() => handleResetSection("faqs")}
          />
        )}
        {tab === "quotes" && <QuotesViewer />}
        {tab === "copy" && (
          <CopyEditor
            copy={content.copy}
            onChange={(copy) => update({ copy })}
            onReset={() => handleResetSection("copy")}
          />
        )}
      </main>
    </div>
  );
}

/* ---------- Reusable inputs ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
    />
  );
}

function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      {...props}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
    />
  );
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------- Screenshot uploader ---------- */

function ScreenshotUploader({
  currentUrl,
  onUploaded,
}: {
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    setUploadError("");
    setUploading(true);
    setProgress(0);

    const storage = getStorage();
    const storageRef = ref(storage, `portfolio/${Date.now()}-${file.name}`);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => {
        setUploadError(err.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onUploaded(url);
        setUploading(false);
        setProgress(0);
      }
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <TextInput
          value={currentUrl}
          onChange={(e) => onUploaded(e.target.value)}
          placeholder="https://... or upload an image"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {uploading ? `${progress}%` : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
            // Reset so the same file can be re-selected if needed
            e.target.value = "";
          }}
        />
      </div>
      {uploadError && (
        <p className="text-xs text-destructive">{uploadError}</p>
      )}
      {currentUrl && !uploading && (
        <img
          src={currentUrl}
          alt="Screenshot preview"
          className="h-24 w-auto rounded-md border border-border object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}

/* ---------- Packages editor ---------- */

function PackagesEditor({
  websitePackages,
  appPackages,
  includedBenefits,
  onChange,
  onReset,
}: {
  websitePackages: Package[];
  appPackages: Package[];
  includedBenefits: string[];
  onChange: (patch: Partial<ContentDoc>) => void;
  onReset: (k: keyof ContentDoc) => void;
}) {
  const updateWebsite = (i: number, p: Partial<Package>) => {
    const next = [...websitePackages];
    next[i] = { ...next[i], ...p };
    onChange({ websitePackages: next });
  };
  const updateApp = (i: number, p: Partial<Package>) => {
    const next = [...appPackages];
    next[i] = { ...next[i], ...p };
    onChange({ appPackages: next });
  };

  const addPackage = (target: "website" | "app") => {
    const newPkg: Package = {
      id: `new-${Date.now()}`,
      name: "New Package",
      category: target === "app" ? "app" : "static",
      monthlyPrice: target === "app" ? null : 499,
      annualPrice: target === "app" ? null : 4999,
      features: ["Feature 1"],
    };
    if (target === "website") onChange({ websitePackages: [...websitePackages, newPkg] });
    else onChange({ appPackages: [...appPackages, newPkg] });
  };

  const removePackage = (target: "website" | "app", i: number) => {
    if (!confirm("Delete this package?")) return;
    if (target === "website")
      onChange({ websitePackages: websitePackages.filter((_, idx) => idx !== i) });
    else onChange({ appPackages: appPackages.filter((_, idx) => idx !== i) });
  };

  return (
    <div>
      <SectionCard
        title="Included Benefits (with every website package)"
        action={
          <button
            onClick={() => onReset("includedBenefits")}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        }
      >
        <ListEditor
          items={includedBenefits}
          onChange={(includedBenefits) => onChange({ includedBenefits })}
          placeholder="e.g. Free Monthly Hosting"
        />
      </SectionCard>

      <SectionCard
        title="Website & Store Packages"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => addPackage("website")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5" /> Add package
            </button>
            <button
              onClick={() => onReset("websitePackages")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {websitePackages.map((pkg, i) => (
            <PackageCardEditor
              key={pkg.id}
              pkg={pkg}
              onChange={(p) => updateWebsite(i, p)}
              onDelete={() => removePackage("website", i)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="App Packages"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => addPackage("app")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5" /> Add package
            </button>
            <button
              onClick={() => onReset("appPackages")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {appPackages.map((pkg, i) => (
            <PackageCardEditor
              key={pkg.id}
              pkg={pkg}
              onChange={(p) => updateApp(i, p)}
              onDelete={() => removePackage("app", i)}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function PackageCardEditor({
  pkg,
  onChange,
  onDelete,
}: {
  pkg: Package;
  onChange: (p: Partial<Package>) => void;
  onDelete: () => void;
}) {
  const hasCms = pkg.cmsMonthlyAddon !== undefined;

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1 grid gap-3 sm:grid-cols-3">
          <Field label="Name">
            <TextInput value={pkg.name} onChange={(e) => onChange({ name: e.target.value })} />
          </Field>
          <Field label="Category">
            <select
              value={pkg.category}
              onChange={(e) => onChange({ category: e.target.value as Package["category"] })}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="static">Static</option>
              <option value="store">Store</option>
              <option value="app">App</option>
            </select>
          </Field>
          <Field label="CTA label (optional)">
            <TextInput
              value={pkg.cta ?? ""}
              onChange={(e) => onChange({ cta: e.target.value || undefined })}
              placeholder="Get Started"
            />
          </Field>
        </div>
        <button
          onClick={onDelete}
          className="rounded-md border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
          aria-label="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <Field label="Monthly price (R)">
          <NumberInput
            value={pkg.monthlyPrice ?? ""}
            onChange={(e) =>
              onChange({ monthlyPrice: e.target.value === "" ? null : Number(e.target.value) })
            }
            placeholder="empty = custom quote"
          />
        </Field>
        <Field label="Annual price (R)">
          <NumberInput
            value={pkg.annualPrice ?? ""}
            onChange={(e) =>
              onChange({ annualPrice: e.target.value === "" ? null : Number(e.target.value) })
            }
            placeholder="empty = custom quote"
          />
        </Field>
      </div>

      <label className="mb-3 flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={pkg.popular ?? false}
          onChange={(e) => onChange({ popular: e.target.checked })}
        />
        <span>Mark as popular</span>
      </label>

      <div className="mb-3 rounded-lg border border-dashed border-border p-3">
        <label className="mb-2 flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={hasCms}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? { cmsMonthlyAddon: 200, cmsAnnualAddon: 2000, cmsFeatures: ["Admin dashboard"] }
                  : { cmsMonthlyAddon: undefined, cmsAnnualAddon: undefined, cmsFeatures: undefined },
              )
            }
          />
          <span className="font-medium text-foreground">Has CMS upgrade option</span>
        </label>
        {hasCms && (
          <>
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <Field label="CMS monthly add-on (R)">
                <NumberInput
                  value={pkg.cmsMonthlyAddon ?? 0}
                  onChange={(e) => onChange({ cmsMonthlyAddon: Number(e.target.value) })}
                />
              </Field>
              <Field label="CMS annual add-on (R)">
                <NumberInput
                  value={pkg.cmsAnnualAddon ?? 0}
                  onChange={(e) => onChange({ cmsAnnualAddon: Number(e.target.value) })}
                />
              </Field>
            </div>
            <Field label="CMS features (when toggled on)">
              <ListEditor
                items={pkg.cmsFeatures ?? []}
                onChange={(cmsFeatures) => onChange({ cmsFeatures })}
                placeholder="e.g. Admin dashboard"
              />
            </Field>
          </>
        )}
      </div>

      <Field label="Features">
        <ListEditor
          items={pkg.features}
          onChange={(features) => onChange({ features })}
          placeholder="e.g. Up to 5 pages"
        />
      </Field>
    </div>
  );
}

function ListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <TextInput
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="rounded-md border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
      >
        <Plus className="h-3.5 w-3.5" /> Add item
      </button>
    </div>
  );
}

/* ---------- Portfolio editor ---------- */

function PortfolioEditor({
  items,
  onChange,
  onReset,
}: {
  items: PortfolioItem[];
  onChange: (i: PortfolioItem[]) => void;
  onReset: () => void;
}) {
  const update = (i: number, p: Partial<PortfolioItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...p };
    onChange(next);
  };
  const add = () =>
    onChange([
      ...items,
      {
        id: `new-${Date.now()}`,
        name: "New Project",
        category: "static",
        screenshot: "",
        url: "#",
        description: "",
      },
    ]);

  return (
    <SectionCard
      title="Portfolio Projects"
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
          >
            <Plus className="h-3.5 w-3.5" /> Add project
          </button>
          <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground">
            Reset
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <TextInput value={item.name} onChange={(e) => update(i, { name: e.target.value })} />
                </Field>
                <Field label="Category">
                  <select
                    value={item.category}
                    onChange={(e) =>
                      update(i, { category: e.target.value as PortfolioItem["category"] })
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="static">Static</option>
                    <option value="dynamic">Dynamic</option>
                    <option value="store">Store</option>
                  </select>
                </Field>
              </div>
              <button
                onClick={() => {
                  if (confirm("Delete this project?"))
                    onChange(items.filter((_, idx) => idx !== i));
                }}
                className="ml-3 rounded-md border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Screenshot">
                <ScreenshotUploader
                  currentUrl={item.screenshot}
                  onUploaded={(url) => update(i, { screenshot: url })}
                />
              </Field>
              <Field label="Project URL">
                <TextInput value={item.url} onChange={(e) => update(i, { url: e.target.value })} />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Description">
                <TextArea
                  rows={2}
                  value={item.description}
                  onChange={(e) => update(i, { description: e.target.value })}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ---------- Reviews editor ---------- */

function ReviewsEditor({
  items,
  onChange,
  onReset,
}: {
  items: Review[];
  onChange: (i: Review[]) => void;
  onReset: () => void;
}) {
  const update = (i: number, p: Partial<Review>) => {
    const next = [...items];
    next[i] = { ...next[i], ...p };
    onChange(next);
  };
  const add = () =>
    onChange([
      ...items,
      { id: `new-${Date.now()}`, name: "New Customer", text: "", rating: 5, avatar: "NC" },
    ]);

  return (
    <SectionCard
      title="Customer Reviews"
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
          >
            <Plus className="h-3.5 w-3.5" /> Add review
          </button>
          <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground">
            Reset
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {items.map((rev, i) => (
          <div key={rev.id} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 grid gap-3 sm:grid-cols-3">
              <Field label="Name">
                <TextInput value={rev.name} onChange={(e) => update(i, { name: e.target.value })} />
              </Field>
              <Field label="Avatar (initials)">
                <TextInput
                  maxLength={3}
                  value={rev.avatar}
                  onChange={(e) => update(i, { avatar: e.target.value.toUpperCase() })}
                />
              </Field>
              <Field label="Rating (1-5)">
                <NumberInput
                  min={1}
                  max={5}
                  value={rev.rating}
                  onChange={(e) =>
                    update(i, { rating: Math.max(1, Math.min(5, Number(e.target.value))) })
                  }
                />
              </Field>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Field label="Review text">
                  <TextArea
                    rows={3}
                    value={rev.text}
                    onChange={(e) => update(i, { text: e.target.value })}
                  />
                </Field>
              </div>
              <button
                onClick={() => {
                  if (confirm("Delete this review?")) onChange(items.filter((_, idx) => idx !== i));
                }}
                className="rounded-md border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ---------- Page Copy editor ---------- */

function CopyEditor({
  copy,
  onChange,
  onReset,
}: {
  copy: PageCopy;
  onChange: (c: PageCopy) => void;
  onReset: () => void;
}) {
  const set = (k: keyof PageCopy, v: string) => onChange({ ...copy, [k]: v });

  return (
    <>
      <SectionCard
        title="Home page"
        action={
          <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground">
            Reset all copy
          </button>
        }
      >
        <div className="grid gap-4">
          <Field label="Hero badge">
            <TextInput value={copy.homeHeroBadge} onChange={(e) => set("homeHeroBadge", e.target.value)} />
          </Field>
          <Field label="Hero title">
            <TextInput value={copy.homeHeroTitle} onChange={(e) => set("homeHeroTitle", e.target.value)} />
          </Field>
          <Field label="Hero subtitle">
            <TextArea
              rows={2}
              value={copy.homeHeroSubtitle}
              onChange={(e) => set("homeHeroSubtitle", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Services page">
        <div className="grid gap-4">
          <Field label="Hero title">
            <TextInput
              value={copy.servicesHeroTitle}
              onChange={(e) => set("servicesHeroTitle", e.target.value)}
            />
          </Field>
          <Field label="Hero subtitle">
            <TextArea
              rows={2}
              value={copy.servicesHeroSubtitle}
              onChange={(e) => set("servicesHeroSubtitle", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>
    </>
  );
}

/* ---------- Contact Page editor ---------- */

function ContactEditor({
  copy,
  onChange,
  onReset,
}: {
  copy: PageCopy;
  onChange: (c: PageCopy) => void;
  onReset: () => void;
}) {
  const set = (k: keyof PageCopy, v: string) => onChange({ ...copy, [k]: v });
  return (
    <SectionCard
      title="Contact page"
      action={
        <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground">
          Reset
        </button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Hero title">
          <TextInput
            value={copy.contactHeroTitle}
            onChange={(e) => set("contactHeroTitle", e.target.value)}
          />
        </Field>
        <Field label="Hero subtitle">
          <TextInput
            value={copy.contactHeroSubtitle}
            onChange={(e) => set("contactHeroSubtitle", e.target.value)}
          />
        </Field>
        <Field label="Contact email">
          <TextInput value={copy.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
        </Field>
        <Field label="WhatsApp number (digits only)">
          <TextInput
            value={copy.whatsappNumber}
            onChange={(e) => set("whatsappNumber", e.target.value.replace(/\D/g, ""))}
          />
        </Field>
        <Field label="Location">
          <TextInput value={copy.location} onChange={(e) => set("location", e.target.value)} />
        </Field>
      </div>
      <div className="mt-6 grid gap-4">
        <h3 className="text-sm font-semibold text-foreground">Bottom CTA banner</h3>
        <Field label="CTA title">
          <TextInput
            value={copy.contactCtaTitle}
            onChange={(e) => set("contactCtaTitle", e.target.value)}
          />
        </Field>
        <Field label="CTA subtitle">
          <TextArea
            rows={2}
            value={copy.contactCtaSubtitle}
            onChange={(e) => set("contactCtaSubtitle", e.target.value)}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

/* ---------- FAQ editor ---------- */

function FaqEditor({
  copy,
  faqs,
  onCopyChange,
  onChange,
  onReset,
}: {
  copy: PageCopy;
  faqs: FAQItem[];
  onCopyChange: (c: PageCopy) => void;
  onChange: (f: FAQItem[]) => void;
  onReset: () => void;
}) {
  const update = (i: number, p: Partial<FAQItem>) => {
    const next = [...faqs];
    next[i] = { ...next[i], ...p };
    onChange(next);
  };
  const add = () => onChange([...faqs, { q: "New question", a: "" }]);
  const setCopy = (k: keyof PageCopy, v: string) => onCopyChange({ ...copy, [k]: v });

  return (
    <>
      <SectionCard title="FAQ page header">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero badge">
            <TextInput value={copy.faqHeroBadge} onChange={(e) => setCopy("faqHeroBadge", e.target.value)} />
          </Field>
          <Field label="Hero title">
            <TextInput value={copy.faqHeroTitle} onChange={(e) => setCopy("faqHeroTitle", e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Questions & Answers"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={add}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5" /> Add FAQ
            </button>
            <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground">
              Reset
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex-1">
                  <Field label="Question">
                    <TextInput value={faq.q} onChange={(e) => update(i, { q: e.target.value })} />
                  </Field>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Delete this FAQ?")) onChange(faqs.filter((_, idx) => idx !== i));
                  }}
                  className="mt-5 rounded-md border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <Field label="Answer">
                <TextArea rows={3} value={faq.a} onChange={(e) => update(i, { a: e.target.value })} />
              </Field>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quote page header (related)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero badge">
            <TextInput
              value={copy.quoteHeroBadge}
              onChange={(e) => setCopy("quoteHeroBadge", e.target.value)}
            />
          </Field>
          <Field label="Hero title">
            <TextInput
              value={copy.quoteHeroTitle}
              onChange={(e) => setCopy("quoteHeroTitle", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Hero subtitle">
              <TextArea
                rows={2}
                value={copy.quoteHeroSubtitle}
                onChange={(e) => setCopy("quoteHeroSubtitle", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </SectionCard>
    </>
  );
}

/* ---------- Quotes viewer ---------- */

function QuotesViewer() {
  const [quotes, setQuotes] = useState<QuoteSubmission[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      setQuotes(await loadQuotes());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote submission? This cannot be undone.")) return;
    try {
      await deleteQuote(id);
      setQuotes((q) => (q ? q.filter((x) => x.id !== id) : q));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <SectionCard
      title={`Quote Submissions${quotes ? ` (${quotes.length})` : ""}`}
      action={
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      }
    >
      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {error}
        </div>
      )}
      {!quotes ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : quotes.length === 0 ? (
        <p className="text-sm text-muted-foreground">No quote submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => {
            const isOpen = open === q.id;
            return (
              <div key={q.id} className="rounded-xl border border-border bg-background">
                <button
                  onClick={() => setOpen(isOpen ? null : q.id ?? null)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className="truncate">{q.fullName || "(no name)"}</span>
                      {q.companyName && (
                        <span className="truncate text-xs font-normal text-muted-foreground">
                          · {q.companyName}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {q.email || "—"}
                      </span>
                      {q.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {q.phone}
                        </span>
                      )}
                      {q.serviceType && <span>· {q.serviceType}</span>}
                      {q.packageName && <span>· {q.packageName}</span>}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground">
                    {q.createdAt ? new Date(q.createdAt).toLocaleString() : "—"}
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-border p-4">
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                      <Detail label="Service">{q.serviceType}</Detail>
                      <Detail label="Package">{q.packageName}</Detail>
                      <Detail label="Billing">{q.billingCycle}</Detail>
                      <Detail label="Budget">{q.budget}</Detail>
                      <Detail label="Deadline">{q.deadline}</Detail>
                    </div>
                    {q.description && (
                      <div className="mt-4">
                        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Project description
                        </div>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                          {q.description}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={`mailto:${q.email}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
                      >
                        <Mail className="h-3.5 w-3.5" /> Reply
                      </a>
                      <button
                        onClick={() => q.id && handleDelete(q.id)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-sm text-foreground">{children || "—"}</div>
    </div>
  );
}