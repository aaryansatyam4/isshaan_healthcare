export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\/()]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}