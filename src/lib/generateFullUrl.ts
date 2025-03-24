// utils/generateFullUrl.ts

export function generateFullUrl(path: string | null | undefined): string {
    // Provide a fallback value for the path if it's null or undefined
    if (!path) {
        return 'http://127.0.0.1:8000'; // Return base URL or other fallback behavior
    }

    const baseUrl = 'http://127.0.0.1:8000'; // default to localhost:8000
    // Ensure the path doesn't have a leading slash (to avoid double slashes)
    const formattedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}/${formattedPath}`;
}
