export async function onRequestGet(context) {
  const apiKey = context.request.headers.get('x-api-key');
  const validApiKey = context.env.VITE_API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return new Response('Forbidden', { status: 403 });
  }
  
    const code = context.params.get;
      try {
        const value = await context.env.RAPORTS.get(code);
  
        if (value === null) {
          return new Response("Value not found", { status: 404 });
        }
        return new Response(value);
      } catch (e) {
        return new Response(e.message, { status: 500 });
      }
}
