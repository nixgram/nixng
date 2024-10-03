export function hasValueInArray( data: any ): boolean {
  return data && Array.isArray( data ) && data.length > 0;
}
