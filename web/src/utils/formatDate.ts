export function formatRelativeDate(dateString: string): string {
  if (!dateString) return "No Date";

  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime(); // difference in ms
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffSeconds < 60) return rtf.format(-diffSeconds, "second");
  if (diffMinutes < 60) return rtf.format(-diffMinutes, "minute");
  if (diffHours < 24) return rtf.format(-diffHours, "hour");
  return rtf.format(-diffDays, "day");
}
