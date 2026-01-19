export function toImageUrl(image?: string | null): string | null {
  if (!image) return null;

  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error("BASE_URL is not defined");

  return `${baseUrl}/${image}`;
}
