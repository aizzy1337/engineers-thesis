import { describe, it, expect } from 'vitest';
import { onRequestGet } from '../../../functions/raport/[get]';

describe('onRequestGet', () => {
    // Arrange
    it('should return 403 if API key is missing', async () => {
      const context = {
        request: { headers: new Headers({ 'x-api-key': '' }) },
        env: { VITE_API_KEY: 'correct-key' }
      };

      // Act
      const response = await onRequestGet(context);

      // Assert
      expect(response.status).toBe(403);
      expect(await response.text()).toBe('Forbidden');
    });
  });

describe('onRequestGet', () => {
    // Arrange
    it('should return 403 if API key is invalid', async () => {
        const context = {
            request: { headers: new Headers({ 'x-api-key': 'wrong-key' }) },
            env: { VITE_API_KEY: 'correct-key' }
        };

        // Act
        const response = await onRequestGet(context);

        // Assert
        expect(response.status).toBe(403);
        expect(await response.text()).toBe('Forbidden');
  });
});

describe('onRequestGet', () => {
    // Arrange
    it('should return 404 if value is missing', async () => {
        const context = {
            request: { headers: new Headers({ 'x-api-key': 'correct-key' }) },
            env: { 
                VITE_API_KEY: 'correct-key',
                RAPORTS: { get: async () => null }
            },
            params: { get: 'existing-code' }
        };

      // Act
      const response = await onRequestGet(context);

      // Assert
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Value not found');
    });
  });

describe('onRequestGet', () => {
    // Arrange
    it('should return 200', async () => {
        const context = {
            request: { headers: new Headers({ 'x-api-key': 'correct-key' }) },
            env: { 
                VITE_API_KEY: 'correct-key',
                RAPORTS: { get: async () => 'value' }
            },
            params: { get: 'existing-code' }
        };

      // Act
      const response = await onRequestGet(context);

      // Assert
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('value');
    });
  });

describe('onRequestGet', () => {
    // Arrange
    it('should return 500 if there is error', async () => {
        const context = {
            request: { headers: new Headers({ 'x-api-key': 'correct-key' }) },
            env: { 
                VITE_API_KEY: 'correct-key',
                RAPORTS: { get: async () => { throw new Error('Test error'); } }
            },
            params: { get: 'existing-code' }
        };

      // Act
      const response = await onRequestGet(context);

      // Assert
      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Test error');
    });
  });