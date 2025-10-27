import PageWrapper from "@/components/page-wrapper";
import Notebooks from "@/components/notebooks";
import { getNotebooks } from "@/actions/notebooks";
import CreateNotebookButton from "@/components/create-notebook-button";
import NotebooksEmptyState from "@/components/notebooks-empty-state";

const breadcrumbs = [{ label: "Notebooks", href: "/notebooks" }];

export default async function DashboardPage() {
  const notebooks = await getNotebooks();

  return (
    <PageWrapper
      title="Notebooks"
      breadcrumbs={breadcrumbs}
      renderActions={<CreateNotebookButton />}
    >
      {notebooks.success ? (
        Array.isArray(notebooks.notebooks) && notebooks.notebooks.length > 0 ? (
          <Notebooks notebooks={notebooks.notebooks} />
        ) : (
          <div className="flex justify-center items-center min-h-96 h-full">
            <NotebooksEmptyState />
          </div>
        )
      ) : (
        <div>Failed to load notebooks.</div>
      )}
    </PageWrapper>
  );
}
