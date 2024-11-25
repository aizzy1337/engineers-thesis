import { describe, it, expect, vi } from 'vitest';
import { onRequest } from '../../../functions/weather/[[catchall]]';

describe('onRequest worker tests', () => {
  global.fetch = vi.fn();

  it('should return 200 and cache response with valid API key', async () => {
    // Arrange
    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify({ data: 'mocked-weather-data' }), { status: 200 }));

    const context = {
      env: {
        VITE_API_KEY: 'correct-key',
        WEATHER_API_KEY: 'weather-api-key',
      },
      request: {
        headers: new Headers({ 'x-api-key': 'correct-key' }),
      },
      params: { catchall: ['35.6895', '139.6917', '2023-01-01', '2023-01-07'] },
    };

    // Act
    const response = await onRequest(context);

    // Assert
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ data: 'mocked-weather-data' });
  });

  it('should return 403 if API key is invalid', async () => {
    // Arrange
    const context = {
      env: {
        VITE_API_KEY: 'correct-key',
      },
      request: {
        headers: new Headers({ 'x-api-key': 'wrong-key' }),
      },
      params: { catchall: ['35.6895', '139.6917', '2023-01-01', '2023-01-07'] },
    };

    // Act
    const response = await onRequest(context);

    // Assert
    expect(response.status).toBe(403);
    const text = await response.text();
    expect(text).toBe('Forbidden');
  });

  it('should return 403 if API key is missing', async () => {
    // Arrange
    const context = {
      env: {
        VITE_API_KEY: 'correct-key',
      },
      request: {
        headers: new Headers(),
      },
      params: { catchall: ['35.6895', '139.6917', '2023-01-01', '2023-01-07'] },
    };

    // Act
    const response = await onRequest(context);

    // Assert
    expect(response.status).toBe(403);
    const text = await response.text();
    expect(text).toBe('Forbidden');
  });

  it('should return 500 if fetch throws an error', async () => {
    // Arrange
    global.fetch.mockRejectedValueOnce(new Error('Fetch error'));

    const context = {
      env: {
        VITE_API_KEY: 'correct-key',
        WEATHER_API_KEY: 'weather-api-key',
      },
      request: {
        headers: new Headers({ 'x-api-key': 'correct-key' }),
      },
      params: { catchall: ['35.6895', '139.6917', '2023-01-01', '2023-01-07'] },
    };

    //Act
    const response = await onRequest(context);

    // Assert
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toBe('Fetch error');
  });
});
