import type { CollectionAfterChangeHook } from "payload";
export const trackSlugChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  collection,
}) => {
  if (
    doc._status !== "published" ||
    !previousDoc?.slug ||
    previousDoc.slug === doc.slug
  )
    return doc;
  const prefix =
    "/" +
    doc.language +
    "/" +
    (collection.slug === "pages" ? "" : collection.slug + "/");
  const from = prefix + previousDoc.slug,
    to = prefix + doc.slug;
  const existing = await req.payload.find({
    collection: "redirects",
    where: { from: { equals: from } },
    limit: 1,
    req,
  });
  if (existing.docs[0])
    await req.payload.update({
      collection: "redirects",
      id: existing.docs[0].id,
      data: { to },
      req,
    });
  else
    await req.payload.create({
      collection: "redirects",
      data: { from, to },
      req,
    });
  return doc;
};
