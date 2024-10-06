export default {
    async fetch(request, env, ctx) {
    const code = ctx.params.get;
      try {
        const value = await env.RAPORT.get(code);
  
        if (value === null) {
          return new Response("Value not found", { status: 404 });
        }
        return new Response(value);
      } catch (e) {
        return new Response(e.message, { status: 500 });
      }
    },
  };