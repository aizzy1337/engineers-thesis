export async function onRequest(context) {
    const code = context.params.catchall[0];
    const put = context.params.catchall[1];
    try {
      await context.env.RAPORTS.put(code, put);

      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
}
