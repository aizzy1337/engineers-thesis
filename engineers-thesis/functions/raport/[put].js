import ForbiddenException from "../../src/exceptions/forbidden-exception"
import InternalServerError from "../../src/exceptions/internal-server-error"

export async function onRequestPost(context) {
    const apiKey = context.request.headers.get('x-api-key');
    const validApiKey = context.env.VITE_API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      throw new ForbiddenException();
    }

    const code = context.params.put;
    try {
      const requestData = await context.request.text();
      await context.env.RAPORTS.put(code, requestData);

      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
        throw new InternalServerError();
    }
}
