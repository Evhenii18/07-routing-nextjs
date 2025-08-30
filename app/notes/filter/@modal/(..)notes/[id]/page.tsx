import NotePreview from "@/components/NotePreview/NotePreview";

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <NotePreview id={id} />
    </div>
  );
}
