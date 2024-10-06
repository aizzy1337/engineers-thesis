export async function onRequestPost(context) {
    const code = context.params.put;
    try {
      const requestData = await context.request;
      await context.env.RAPORTS.put(code, requestData);

      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
}
