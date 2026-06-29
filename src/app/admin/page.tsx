import Link from "next/link";
import { ArrowRight, Database, FileText } from "lucide-react";

import { collections } from "@/lib/cms/registry";

export default function AdminDashboard() {
  const objects = collections.filter((c) => c.mode === "object");
  const lists = collections.filter((c) => c.mode === "list");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Content dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit any collection below. Changes are saved as drafts; use the Publish bar to go live.
      </p>

      <Section title="Site" icon={<FileText className="size-4" />} items={objects} />
      <Section title="Collections" icon={<Database className="size-4" />} items={lists} />
    </div>
  );
}

function Section({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: typeof collections;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/admin/${c.id}`}
            className="group rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-navy">{c.label}</h3>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-aster-700" />
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
