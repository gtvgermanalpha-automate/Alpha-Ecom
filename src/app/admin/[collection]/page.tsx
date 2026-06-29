import { notFound } from "next/navigation";

import { getCollection } from "@/lib/cms/registry";
import { CollectionEditor, CollectionIndex } from "@/components/admin/collection-editor";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  return col.mode === "object" ? (
    <CollectionEditor id={collection} />
  ) : (
    <CollectionIndex id={collection} />
  );
}
