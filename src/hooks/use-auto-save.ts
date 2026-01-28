import { useEffect, useRef } from 'react';

import { useBeforeUnload } from '@/hooks/use-before-unload';
import { useUpdateTemplate } from '@/hooks/use-templates';
import { useTemplateStore } from '@/stores/template-store';

const DEBOUNCE_DELAY = 1000;

export function useAutoSave() {
  const { activeItem, setSaveStatus } = useTemplateStore();
  const { mutate: updateTemplate } = useUpdateTemplate(activeItem?.id ?? '');

  // 마지막으로 저장된 상태를 추적 (불필요한 저장 방지)
  const lastSavedRef = useRef<string | null>(null);
  const lastItemIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(false);

  // 컴포넌트 마운트 상태 추적
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const executeSave = (currentData: string) => {
    setSaveStatus('saving');

    const updateData = {
      title: activeItem!.title,
      content: activeItem!.content,
      variables: activeItem!.variables,
      outputType: activeItem!.outputType,
    };

    const mutationOptions = {
      onSuccess: () => {
        if (!isMountedRef.current) return;
        setSaveStatus('saved');
        lastSavedRef.current = currentData;
      },
      onError: () => {
        if (!isMountedRef.current) return;
        setSaveStatus('error');
      },
    };

    updateTemplate(updateData, mutationOptions);
  };

  const debouncedSave = (currentData: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSaveStatus('editing');

    timeoutRef.current = setTimeout(() => executeSave(currentData), DEBOUNCE_DELAY);
  };

  const initializeStateForNewTemplate = (currentData: string) => {
    if (activeItem!.id !== lastItemIdRef.current) {
      lastItemIdRef.current = activeItem!.id;
      lastSavedRef.current = currentData;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return true;
    }
    return false;
  };

  // 템플릿 변경 감지 및 자동 저장 트리거
  useEffect(() => {
    if (!activeItem) return;

    const currentData = JSON.stringify({
      title: activeItem.title,
      content: activeItem.content,
      variables: activeItem.variables,
      outputType: activeItem.outputType,
    });

    if (initializeStateForNewTemplate(currentData)) {
      return;
    }

    if (currentData === lastSavedRef.current) {
      return;
    }

    debouncedSave(currentData);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem, updateTemplate, setSaveStatus]);

  useBeforeUnload(() => {
    if (!activeItem) return false;

    const currentData = JSON.stringify({
      title: activeItem.title,
      content: activeItem.content,
      variables: activeItem.variables,
      outputType: activeItem.outputType,
    });

    return currentData !== lastSavedRef.current;
  });
}
