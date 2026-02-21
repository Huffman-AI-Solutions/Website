/**
 * Cloudflare Worker for Huffman AI Solutions Website
 * Serves static HTML files and handles routing
 */

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Route handling
    let filePath: string;
    
    if (path === '/' || path === '') {
      filePath = 'index.html';
    } else if (path === '/about' || path === '/about.html') {
      filePath = 'about.html';
    } else if (path === '/privacy' || path === '/privacy.html') {
      filePath = 'privacy.html';
    } else if (path === '/terms' || path === '/terms.html') {
      filePath = 'terms.html';
    } else {
      // Serve the requested file directly (for assets like images, etc.)
      filePath = path.startsWith('/') ? path.slice(1) : path;
    }

    // In a real Cloudflare Pages deployment, static assets are served automatically
    // This worker is a minimal entry point as requested
    // Cloudflare Pages will handle actual file serving

    return new Response('Worker entry point configured. Cloudflare Pages will serve static assets.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
