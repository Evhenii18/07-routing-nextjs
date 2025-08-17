"use client";

import React from "react";
import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { CategoryType } from "@/lib/api";

interface SidebarNotesProps {
  categories: CategoryType[];
}

export default function SidebarNotes({ categories }: SidebarNotesProps) {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
          </Link>
        </li>

        {categories.map((category) => (
          <li key={category.tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${category.tag}`}
              className={css.menuLink}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
