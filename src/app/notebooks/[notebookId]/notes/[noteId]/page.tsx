import { getNotebookById } from "@/actions/notebooks";
import PageWrapper from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";

export const dynamic = "force-dynamic";

type Params = Promise<{ notebookId: string; noteId: string }>;

export default async function NotePage({ params }: { params: Params }) {
  const { notebookId, noteId } = await params;
  const notebook = await getNotebookById(notebookId);

  const breadcrumbs = [{ label: "Notebooks", href: "/notebooks" }];

  if (notebook.success && notebook.notebook) {
    breadcrumbs.push({
      label: notebook.notebook.name,
      href: `/notebooks/${notebook.notebook.id}`,
    });
  }

  let note = null;
  if (
    notebook.success &&
    notebook.notebook?.notes &&
    notebook.notebook?.notes?.length > 0
  ) {
    note = notebook.notebook?.notes.find((n) => n.id === noteId);
    if (note) {
      breadcrumbs.push({
        label: note.title,
        href: `/notebooks/${notebookId}/notes/${note.id}`,
      });
    }
  }

  return (
    <PageWrapper title={note?.title || "Note"} breadcrumbs={breadcrumbs}>
      <RichTextEditor
        noteId={noteId}
        content={note?.content as JSONContent[]}
      />
    </PageWrapper>
  );
}
