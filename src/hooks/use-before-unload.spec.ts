import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useBeforeUnload } from './use-before-unload';

describe('useBeforeUnload', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('마운트 시 beforeunload 이벤트 리스너를 등록해야 한다', () => {
    const shouldPrevent = () => false;

    renderHook(() => useBeforeUnload(shouldPrevent));

    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });

  it('언마운트 시 beforeunload 이벤트 리스너를 제거해야 한다', () => {
    const shouldPrevent = () => false;

    const { unmount } = renderHook(() => useBeforeUnload(shouldPrevent));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });

  it('shouldPrevent가 true를 반환하면 이벤트를 방지해야 한다', () => {
    const shouldPrevent = () => true;

    renderHook(() => useBeforeUnload(shouldPrevent));

    const handler = addEventListenerSpy.mock.calls.find(
      (call: unknown[]) => call[0] === 'beforeunload',
    )?.[1] as EventListener;

    const mockEvent = {
      preventDefault: vi.fn(),
      returnValue: '',
    } as unknown as BeforeUnloadEvent;

    handler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.returnValue).toBe('');
  });

  it('shouldPrevent가 false를 반환하면 이벤트를 방지하지 않아야 한다', () => {
    const shouldPrevent = () => false;

    renderHook(() => useBeforeUnload(shouldPrevent));

    const handler = addEventListenerSpy.mock.calls.find(
      (call: unknown[]) => call[0] === 'beforeunload',
    )?.[1] as EventListener;


    const mockEvent = {
      preventDefault: vi.fn(),
      returnValue: 'initial',
    } as unknown as BeforeUnloadEvent;

    handler(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(mockEvent.returnValue).toBe('initial');
  });

  it('shouldPrevent 함수가 변경되면 새 핸들러를 등록해야 한다', () => {


    const { rerender } = renderHook(
      ({ prevent }) => useBeforeUnload(() => prevent),
      { initialProps: { prevent: false } },
    );

    const initialCallCount = addEventListenerSpy.mock.calls.length;

    rerender({ prevent: true });

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(addEventListenerSpy.mock.calls.length).toBeGreaterThan(initialCallCount);
  });
});
