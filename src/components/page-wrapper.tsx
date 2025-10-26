import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import LogoutButton from "./logout-button";
import ModeToggle from "./mode-toggle";

interface PageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export default function PageWrapper({
  children,
  breadcrumbs,
}: PageWrapperProps) {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            {breadcrumbs.length > 0 && (
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            )}
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem>
                      {index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </div>
  );
}
