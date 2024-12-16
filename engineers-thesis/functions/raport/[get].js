import ForbiddenException from "../../src/exceptions/forbidden-exception"
import InternalServerError from "../../src/exceptions/internal-server-error"
import NotFoundException from "../../src/exceptions/not-found-exception"

export async function onRequestGet(context) {
  const apiKey = context.request.headers.get('x-api-key');
  const validApiKey = context.env.VITE_API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    throw new ForbiddenException();
  }
  
    const code = context.params.get;
      try {
        const value = await context.env.RAPORTS.get(code);
  
        if (value === null) {
          throw new NotFoundException();
        }
        return new Response(value);
      } catch (e) {
          throw new InternalServerError();
      }
}
