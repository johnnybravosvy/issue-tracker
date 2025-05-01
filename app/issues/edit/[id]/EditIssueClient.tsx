// app/issues/edit/[id]/EditIssueClient.tsx
"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue; // Use the full Prisma model type
}

export default function EditIssueClient({ issue }: Props) {
  return <IssueForm issue={issue} />;
}
