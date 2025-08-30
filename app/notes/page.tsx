import NotesClient from "../notes/Notes.client";
import { fetchNotes, fetchTags, CategoryType } from "@/lib/api";
import SidebarNotes from "@/app/notes/filter/@sidebar/SidebarNotes";

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const tagFromSlug = params.slug?.[0];
  const page = 1;
  const limit = 12;

  const apiTag = tagFromSlug?.toLowerCase() === "all" ? undefined : tagFromSlug;

  const initialData = await fetchNotes(page, limit, "", apiTag);
  const categories: CategoryType[] = await fetchTags();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flexShrink: 0 }}>
        <SidebarNotes categories={categories} />
      </div>

      <div style={{ flexGrow: 1 }}>
        <NotesClient initialData={initialData} tag={tagFromSlug} />
      </div>
    </div>
  );
}
