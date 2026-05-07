import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateId } from '../../src/lib/utils';

describe('generateId', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses crypto.randomUUID when available', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    const mockCrypto = {
      randomUUID: vi.fn().mockReturnValue(mockUuid)
    };

    Object.defineProperty(global, 'crypto', {
      value: mockCrypto,
      configurable: true,
      writable: true
    });

    const id = generateId();
    expect(id).toBe(mockUuid);
    expect(mockCrypto.randomUUID).toHaveBeenCalled();
  });

  it('uses Math.random fallback when crypto is unavailable', () => {
    Object.defineProperty(global, 'crypto', {
      value: undefined,
      configurable: true,
      writable: true
    });

    const id = generateId();
    expect(id).toBeDefined();
    expect(id.length).toBeGreaterThan(10);
  });
});
