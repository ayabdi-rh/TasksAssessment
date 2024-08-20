export function cleanText(text: string): string {
  // Replace symbols like "_" with space
  const cleanedText = text.replace(/[_-]/g, ' ')
  return cleanedText

}


