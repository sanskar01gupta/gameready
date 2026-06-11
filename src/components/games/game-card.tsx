import Link from "next/link";
import { Gamepad2 } from "lucide-react";

interface GameCardProps {
  slug: string;
  title: string;
  coverImageUrl: string | null;
  genres: string[];
  className?: string;
}

export function GameCard({ slug, title, coverImageUrl, genres, className = "" }: GameCardProps) {
  return (
    <Link
      href={`/games/${slug}`}
      className={`group block rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--accent)]/5 ${className}`}
    >
      <div className="aspect-[16/9] relative overflow-hidden bg-[var(--border)]">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gamepad2 className="h-12 w-12 text-[var(--muted-foreground)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-tight truncate">{title}</h3>
        {genres.length > 0 && (
          <p className="text-xs text-[var(--muted-foreground)] mt-1 truncate">
            {genres.slice(0, 3).join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
}
