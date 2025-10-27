import * as React from "react";
import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/actions/notebooks";
import Link from "next/link";
import { Logo } from "./logo";
import { SidebarItems } from "./sidebar-items";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    versions: [],
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/notebooks/${notebook.id}`,
        isActive: false, // You can implement logic to determine if it's active
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/notebooks/${notebook.id}/notes/${note.id}`,
          isActive: false, // You can implement logic to determine if it's active
        })),
      })) || []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/notebooks" className="flex items-center space-x-2">
          <Logo className="size-10" />
          <span className="text-2xl font-bold">NoteForge</span>
        </Link>

        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarItems data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
