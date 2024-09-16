"use client";

import { CuratedContent } from "./_components/CuratedContent";
import { ExploreContent } from "./_components/ExploreContent";
import { PickCategories } from "./_components/PickCategories";
import type { NextPage } from "next";

const Grid: NextPage = () => {
  return (
    <div>
      <PickCategories />
      <CuratedContent />
      <ExploreContent />
    </div>
  );
};

export default Grid;
