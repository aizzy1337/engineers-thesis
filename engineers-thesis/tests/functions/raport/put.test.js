import { describe, it, expect } from 'vitest';
import { onRequestPost } from '../../../functions/raport/[put]';

describe('onRequestPost', () => {

    it('should return 201 on successful write with valid API key', async () => {
    // Arrange
      const context = {
        env: {
          VITE_API_KEY: 'correct-key',
          RAPORTS: { put: async () => {} },
        },
        request: {
          headers: new Headers({ 'x-api-key': 'correct-key' }),
          text: async () => 'test-data',
        },
        params: { put: 'test-code' },
      };
  
      // Act
      const response = await onRequestPost(context);

      // Assert
      expect(response.status).toBe(201);
      const text = await response.text();
      expect(text).toBe('Successful write');
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
        params: { put: 'test-code' },
      };
  
      // Act
      const response = await onRequestPost(context);

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
        params: { put: 'test-code' },
      };
  
      // Act
      const response = await onRequestPost(context);

      // Assert
      expect(response.status).toBe(403);
      const text = await response.text();
      expect(text).toBe('Forbidden');
    });
  
    it('should return 500 if there is error', async () => {
    // Arrange
      const context = {
        env: {
          VITE_API_KEY: 'correct-key',
          RAPORTS: {
            put: async () => { throw new Error('Test error'); },
          },
        },
        request: {
          headers: new Headers({ 'x-api-key': 'correct-key' }),
          text: async () => 'test-data',
        },
        params: { put: 'test-code' },
      };
  
      // Act
      const response = await onRequestPost(context);

      // Assert
      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toBe('Test error');
    });
  });