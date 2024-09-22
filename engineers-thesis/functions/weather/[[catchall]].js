export async function onRequest(context) {
  const latitude = context.params.catchall[0];
  const longitude = context.params.catchall[1];
  const startDate = context.params.catchall[2];
  const endDate = context.params.catchall[3];
  const url = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C${longitude}/${startDate}/${endDate}?unitGroup=metric&elements=datetime%2Ctemp%2Cwindspeed%2Csolarradiation&include=days&key=${context.env.WEATHER_API_KEY}&contentType=json`);

  let response = await fetch(url, {
    cf: {
      cacheTtlByStatus: { "200-299": 2592000, "404": 1, "500-599": 0 },
      cacheEverything: true
    }
  });

  response = new Response(response.body, response);
  response.headers.set("Cache-Control", "max-age=2592000");

  return response;
}