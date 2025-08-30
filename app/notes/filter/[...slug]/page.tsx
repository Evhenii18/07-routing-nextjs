import NotesClient from "../../Notes.client";
import { fetchNotes, fetchTags, CategoryType } from "@/lib/api";
import SidebarNotes from "@/app/notes/filter/@sidebar/SidebarNotes";

type Props = {
  params: { slug: string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0];

  const page = 1;
  const limit = 12;

  const initialData =
    tag === "All" || !tag
      ? await fetchNotes(page, limit)
      : await fetchNotes(page, limit, "", tag);

  const categories: CategoryType[] = await fetchTags();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flexShrink: 0 }}>
        <SidebarNotes categories={categories} />
      </div>

      <div style={{ flexGrow: 1 }}>
        <NotesClient initialData={initialData} tag={tag} />
      </div>
    </div>
  );
}
