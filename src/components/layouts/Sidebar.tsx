import {
  ChartNoAxesColumn,
  Home,
  Library,
  ListMusic,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { NavigationPath } from "../../App";



const ICON_SIZE = 18;
const ICON_STROKE = 1.6;


export interface SidebarProps {
  currentPath : NavigationPath
  navigation : (targetPath: NavigationPath)=> void;
}


export function Sidebar({currentPath , navigation} : SidebarProps) {
  const NAV_ITEMS = [
  { section: NavigationPath.home, label: "Home", icon: Home },
  { section: NavigationPath.Library, label: "Library", icon: Library },
  { section: NavigationPath.playsists, label: "Playlists", icon: ListMusic },
  { section: NavigationPath.analytics, label: "Analytics", icon: ChartNoAxesColumn },
  { section: NavigationPath.settings, label: "Settings", icon: Settings },
];

  return (
    <aside className="flex flex-col min-h-0 pt-(--space-6) pb-(--space-6) pr-(--space-4) pl-[var(--space-6)] bg-[var(--color-bg)] border-r border-solid border-r-[var(--color-border-subtle)]">
      {/* Brand Header */}
      <a className="grid grid-cols-[auto_1fr] items-center gap-x-[var(--space-2)] pt-[var(--space-1)] pb-[var(--space-8)] px-[var(--space-2)] rounded-[var(--radius-sm)]">
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
        <span className="text-[var(--text-sm)] font-600 tracking-[0.3em] text-[var(--color-text-primary)]">
          SONORA
        </span>
        <span className="col-start-2 mt-[var(--space-1)] font-[var(--font-mono)] text-[var(--text-2xs)] tracking-[var(--tracking-wide)] uppercase text-[var(--color-text-muted)]">
          Local listening
        </span>
      </a>

      {/* Navigation */}
      <nav className="flex-1 min-h-0" aria-label="Main">
        <ul className="flex flex-col gap-[2px]">
          {NAV_ITEMS.map((item) => {
            const isActive = item.section === currentPath;
            return (
              <li key={item.section} onClick={()=>navigation(item.section)}>
                <a
                  className="relative flex items-center gap-(--space-3) min-h-8.5 px-(--space-3) rounded-sm text-(--color-text-secondary) transition-[color,background-color] duration-200 ease-in-out 
                             hover:text-(--color-text-primary) hover:bg-(--color-surface) 
                             aria-[current=page]:text-(--color-text-primary) aria-[current=page]:bg-(--color-surface) 
                             aria-[current=page]:before:content-[''] aria-[current=page]:before:absolute aria-[current=page]:before:left-0 aria-[current=page]:before:top-1/2 aria-[current=page]:before:-translate-y-1/2 aria-[current=page]:before:w-[2px] aria-[current=page]:before:h-4 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-[var(--color-accent)]"
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    size={ICON_SIZE}
                    strokeWidth={ICON_STROKE}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
