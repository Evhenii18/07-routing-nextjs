"use client";
import { useState } from "react";
import Link from "next/link";
import type { CategoryType } from "@/lib/api";
import css from "./TagsMenu.module.css";

interface TagsMenuProps {
  categories: CategoryType[];
}

export default function TagsMenu({ categories }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/all`}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={css.menuItem}>
              <Link
                className={css.menuLink}
                href={`/notes/filter/${category.tag}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
