import Link from "next/link";

import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href={`/notes/${uuidv4()}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        New Note
      </Link>
      <Link
        href="/account"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Account
      </Link>
    </nav>
  );
}
