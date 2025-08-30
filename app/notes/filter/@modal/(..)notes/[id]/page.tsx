"use client";

import NotePreview from "@/components/NotePreview/NotePreview";

interface NotePageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <NotePreview id={params.id} />
    </div>
  );
}
