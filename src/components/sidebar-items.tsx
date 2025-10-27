"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { ChevronRight, FileText } from "lucide-react";
import { useQueryState } from "nuqs";

interface SidebarItemsProps {
  data: {
    navMain: {
      title: string;
      url: string;
      isActive: boolean;
      items: {
        title: string;
        url: string;
        isActive: boolean;
      }[];
    }[];
  };
}

export function SidebarItems({ data }: SidebarItemsProps) {
  const [search] = useQueryState("search", { defaultValue: "" });

  const filteredItems = data.navMain.filter((item) => {
    const notebookTitleMatches = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const noteTitleMatches = item.items.some((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    return noteTitleMatches || notebookTitleMatches;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                {item.title}{" "}
                {item.items.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <Link href={item.url}>
                          <FileText className="size-4" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
