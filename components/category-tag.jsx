export function CategoryTag({
  name,
  color
}) {
  return (
    (<span
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${color}`}>
      {name}
    </span>)
  );
}

