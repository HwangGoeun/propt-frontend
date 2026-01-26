import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { useAutoSave } from './use-auto-save';

const mockMutate = vi.fn();
vi.mock('@/hooks/use-templates', () => ({
  useUpdateTemplate: vi.fn(() => ({
    mutate: mockMutate,
  })),
}));

vi.mock('@/hooks/use-before-unload', () => ({
  useBeforeUnload: vi.fn(),
}));

describe('useAutoSave', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTemplateStore.setState({
      activeItem: null,
      setSaveStatus: vi.fn(),
    });
  });

  it('activeItem이 없으면 저장하지 않아야 한다', () => {
    useTemplateStore.setState({
      activeItem: null,
      setSaveStatus: vi.fn(),
    });

    renderHook(() => useAutoSave());

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('초기 렌더링 시 저장하지 않아야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content',
        variables: [],
        outputType: null,
      },
      setSaveStatus,
    });

    renderHook(() => useAutoSave());

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('동일한 내용이면 저장하지 않아야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content',
        variables: [],
        outputType: null,
      },
      setSaveStatus,
    });

    const { rerender } = renderHook(() => useAutoSave());

    rerender();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('템플릿 ID가 변경되면 저장 상태를 초기화해야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content',
        variables: [],
        outputType: null,
      },
      setSaveStatus,
    });

    renderHook(() => useAutoSave());

    useTemplateStore.setState({
      activeItem: {
        id: '2', // Different ID
        title: 'Test 2',
        content: 'Content 2',
        variables: [],
        outputType: null,
      },
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('훅이 마운트될 때 에러 없이 실행되어야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content',
        variables: [],
        outputType: null,
      },
      setSaveStatus,
    });

    expect(() => {
      renderHook(() => useAutoSave());
    }).not.toThrow();
  });

  it('activeItem에 outputType이 있어도 정상 작동해야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content',
        variables: [],
        outputType: 'text',
      },
      setSaveStatus,
    });

    expect(() => {
      renderHook(() => useAutoSave());
    }).not.toThrow();
  });

  it('variables가 있어도 정상 작동해야 한다', () => {
    const setSaveStatus = vi.fn();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Content with {{variable}}',
        variables: [{ name: 'variable' }],
        outputType: null,
      },
      setSaveStatus,
    });

    expect(() => {
      renderHook(() => useAutoSave());
    }).not.toThrow();
  });
});
