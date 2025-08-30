"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import css from "./Notes.client.module.css";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NotePreview from "@/components/NotePreview/NotePreview";

import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

interface NotesClientProps {
  initialData: { notes: Note[]; totalPages: number };
  tag?: string;
}

const ITEMS_PER_PAGE = 12;

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteIdFromQuery = searchParams?.get("note");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(
    noteIdFromQuery
  );

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    debouncedSetSearch(value);
  };

  const apiTag = tag?.toLowerCase() === "all" ? undefined : tag;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", apiTag, search, currentPage],
    queryFn: () => fetchNotes(currentPage, ITEMS_PER_PAGE, search, apiTag),
    initialData,
    placeholderData: initialData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  useEffect(() => {
    setSelectedNoteId(noteIdFromQuery);
  }, [noteIdFromQuery]);

  const onNoteClick = (id: string) => {
    setSelectedNoteId(id);
    router.push(`${window.location.pathname}?note=${id}`, { scroll: false });
  };

  const closeNoteModal = () => {
    setSelectedNoteId(null);
    router.push(window.location.pathname, { scroll: false });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className={css.navbar}>
        <SearchBox onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageCount={data.totalPages}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      <main style={{ flexGrow: 1, overflowY: "auto" }}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes.</p>}
        {data?.notes?.length ? (
          <NoteList notes={data.notes} onNoteClick={onNoteClick} />
        ) : (
          <p>No notes found.</p>
        )}
      </main>

      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <NoteForm onCancel={() => setIsCreateModalOpen(false)} />
        </Modal>
      )}

      {selectedNoteId && (
        <Modal onClose={closeNoteModal}>
          <NotePreview id={selectedNoteId} />
        </Modal>
      )}
    </div>
  );
}
