// src/app/(pages)/dashboard/(pages)/(role)/(admin)/all-member/page.tsx
import { Suspense } from "react";

import LoadingState from "@/components/loading";
import Body from "./contents/body/page";

export default function AllMember() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Body />
    </Suspense>
  );
}
