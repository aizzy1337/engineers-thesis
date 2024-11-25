export async function onRequestPost(context) {
    const apiKey = context.request.headers.get('x-api-key');
    const validApiKey = context.env.VITE_API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return new Response('Forbidden', { status: 403 });
    }

    const code = context.params.put;
    try {
      const requestData = await context.request.text();
      await context.env.RAPORTS.put(code, requestData);

      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
}
