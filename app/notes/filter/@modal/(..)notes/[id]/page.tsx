import NotePreview from "@/components/NotePreview/NotePreview";

type Props = {
  params: { id: string };
};

export default function NotePage({ params }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <NotePreview id={params.id} />
    </div>
  );
}
