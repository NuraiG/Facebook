function truncateString(string, maxLength) {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
}

export { truncateString };
