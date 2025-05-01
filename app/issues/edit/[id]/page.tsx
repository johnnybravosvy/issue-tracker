// app/issues/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import EditIssueClient from "./EditIssueClient";

interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <EditIssueClient issue={issue} />;
}

// import React from "react";
// import prisma from "@/prisma/client";
// import { notFound } from "next/navigation";
// import dynamic from "next/dynamic";
// import IssueFormSkeleton from "./loading";

// const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
//   ssr: false,
//   loading: () => <IssueFormSkeleton />,
// });

// interface Props {
//   params: { id: string };
// }

// const EditIssuePage = async ({ params }: Props) => {
//   const id = parseInt(params.id);

//   const issue = await prisma.issue.findUnique({
//     where: { id: parseInt(params.id) },
//   });

//   if (!issue) notFound();

//   return <IssueForm issue={issue} />;
// };

// export default EditIssuePage;
