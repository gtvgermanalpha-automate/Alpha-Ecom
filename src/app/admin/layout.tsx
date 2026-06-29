import type { Metadata } from "next";

import { collections } from "@/lib/cms/registry";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const nav = collections.map((c) => ({ id: c.id, label: c.label, mode: c.mode }));
  return <AdminShell nav={nav}>{children}</AdminShell>;
}
