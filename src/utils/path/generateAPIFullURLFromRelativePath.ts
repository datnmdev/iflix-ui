const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export default function generateAPIFullURLFromRelativePath(relativePath: string) {
  return API_BASE_URL.concat(relativePath)
}