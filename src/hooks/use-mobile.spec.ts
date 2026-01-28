import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  let matchMediaListeners: Map<string, (e: MediaQueryListEvent) => void>;
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    matchMediaListeners = new Map();

    mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          matchMediaListeners.set(query, listener);
        }
      }),
      removeEventListener: vi.fn((event: string) => {
        if (event === 'change') {
          matchMediaListeners.delete(query);
        }
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기값은 false여야 한다 (데스크톱)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('창 너비가 768px 미만이면 true를 반환해야 한다', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('창 너비가 768px 이상이면 false를 반환해야 한다', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('창 크기 변경 시 값이 업데이트되어야 한다', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
      const listener = matchMediaListeners.get('(max-width: 767px)');
      if (listener) {
        listener({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it('언마운트 시 이벤트 리스너가 제거되어야 한다', () => {
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    const mockMediaQueryList = mockMatchMedia.mock.results[0].value;
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
