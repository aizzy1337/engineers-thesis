export function onRequest(context) {
    console.log(JSON.stringify(context.params.catchall));
    return new Response(JSON.stringify(context.params.catchall));
  }