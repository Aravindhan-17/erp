import React from "react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-4xl font-black">Category: {id}</h1>
      <p className="text-foreground/75">
        This is a placeholder page for the individual category.
      </p>
    </div>
  );
}
