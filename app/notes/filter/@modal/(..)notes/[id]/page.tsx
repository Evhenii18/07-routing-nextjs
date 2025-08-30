"use client";

import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <NotePreview id={params.id} />
    </div>
  );
}
