import PageWrapper from "@/components/page-wrapper";
import Notebooks from "@/components/notebooks";
import { getNotebooks } from "@/actions/notebooks";
import CreateNotebookButton from "@/components/create-notebook-button";

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Home", href: "/dashboard/home" },
];

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
          <div>No notebooks found.</div>
        )
      ) : (
        <div>Failed to load notebooks.</div>
      )}
    </PageWrapper>
  );
}
