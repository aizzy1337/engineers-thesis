export default {
  async fetch(request, env, ctx) {
    const code = ctx.params.catchall[0];
    const put = ctx.params.catchall[1];
    try {
      await env.RAPORT.put(code, put);

      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};