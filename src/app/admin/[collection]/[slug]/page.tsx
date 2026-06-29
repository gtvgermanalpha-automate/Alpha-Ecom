import { notFound } from "next/navigation";

import { getCollection } from "@/lib/cms/registry";
import { CollectionEditor } from "@/components/admin/collection-editor";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  const col = getCollection(collection);
  if (!col || col.mode !== "list") notFound();

  return <CollectionEditor id={collection} slug={decodeURIComponent(slug)} />;
}
