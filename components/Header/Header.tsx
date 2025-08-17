import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import { CategoryType } from "@/lib/api";

interface HeaderProps {
  categories: CategoryType[];
}

export default function Header({ categories }: HeaderProps) {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu categories={categories} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
