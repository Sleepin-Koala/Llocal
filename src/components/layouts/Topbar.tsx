import { Search } from "lucide-react";

export function TopBar() {

  return (
    <header className="flex items-center justify-between gap-[var(--space-6)] flex-none h-[var(--layout-topbar-height)] px-[var(--layout-gutter)] border-b border-solid border-b-[var(--color-border-subtle)]">
      {/* Search Form */}
      <form className="flex items-center gap-[var(--space-2)] w-[min(360px,46vw)] h-[34px] px-[var(--space-3)] border border-solid border-[var(--color-border-subtle)] rounded-[var(--radius-md)] bg-[var(--color-surface)] transition-colors duration-200 ease-in-out focus-within:border-[var(--color-border)]" role="search">
        <Search
          className="flex-none text-[var(--color-text-muted)]"
          size={16}
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <input
          className="w-full min-w-0 border-none bg-none outline-none text-[var(--text-sm)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] [&::-webkit-search-cancel-button]:appearance-none"
          type="search"
          placeholder="Search tracks, albums, artists"
          aria-label="Search the library"
        />
      </form>

      {/* Aside Section */}
      <div className="flex items-center gap-[var(--space-4)]">
        <p className="flex items-center gap-[var(--space-2)] font-[var(--font-mono)] text-[var(--text-2xs)] tracking-[0.04em] text-[var(--color-text-muted)] whitespace-nowrap" aria-live="polite">
          <span
            className={`w-[5px] h-[5px] rounded-full aria-hidden="true bg-[var(--color-success)]"
            }`}
          />
          {"statusText"}
        </p>
      </div>
    </header>
  );
}
