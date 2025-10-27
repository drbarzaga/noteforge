import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { getNotebookById } from "@/actions/notebooks";
import NotebookCard from "@/components/notebook-card";

type Params = Promise<{ notebookId: string }>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;
  const notebook = await getNotebookById(notebookId);

  const breadcrumbs = [{ label: "Notebooks", href: "/notebooks" }];

  if (notebook.success && notebook.notebook) {
    breadcrumbs.push({
      label: notebook.notebook.name,
      href: `/notebooks/${notebookId}`,
    });
  }

  return (
    <PageWrapper title={notebook.notebook?.name} breadcrumbs={breadcrumbs}>
      Notebook Page
    </PageWrapper>
  );
}
