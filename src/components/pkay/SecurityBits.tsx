import type { ReactNode } from "react";
import { PageHeader } from "./primitives";

/** Page header used inside the Security Lab layout. */
export function AppShellFreeHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return <PageHeader title={title} description={description} actions={actions} />;
}
