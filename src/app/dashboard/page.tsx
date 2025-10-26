import LogoutButton from "@/components/logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Home", href: "/dashboard/home" },
  ];

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <LogoutButton />
    </PageWrapper>
  );
}
