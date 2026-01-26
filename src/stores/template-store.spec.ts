import { beforeEach, describe, expect, it } from 'vitest';

import type { Template } from '@/types/template';

import { useTemplateStore } from './template-store';

describe('useTemplateStore', () => {
  const mockTemplate: Template = {
    id: 'template-1',
    title: 'Test Template',
    content: 'Hello {name}!',
    variables: [{ name: 'name', description: null }],
    outputType: 'text',
  };

  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  describe('초기 상태', () => {
    it('activeItem이 null이어야 한다', () => {
      const { activeItem } = useTemplateStore.getState();

      expect(activeItem).toBeNull();
    });

    it('isInitialized가 false여야 한다', () => {
      const { isInitialized } = useTemplateStore.getState();

      expect(isInitialized).toBe(false);
    });

    it('saveStatus가 idle이어야 한다', () => {
      const { saveStatus } = useTemplateStore.getState();

      expect(saveStatus).toBe('idle');
    });

    it('showOutputTypeBlock이 false여야 한다', () => {
      const { showOutputTypeBlock } = useTemplateStore.getState();

      expect(showOutputTypeBlock).toBe(false);
    });
  });

  describe('setActiveItem', () => {
    it('activeItem을 설정해야 한다', () => {
      useTemplateStore.getState().setActiveItem(mockTemplate);

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem).toEqual(mockTemplate);
    });

    it('activeItem을 null로 설정할 수 있어야 한다', () => {
      useTemplateStore.setState({ activeItem: mockTemplate });

      useTemplateStore.getState().setActiveItem(null);

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem).toBeNull();
    });
  });

  describe('updateActiveItem', () => {
    it('activeItem의 일부 필드를 업데이트해야 한다', () => {
      useTemplateStore.setState({ activeItem: mockTemplate });

      useTemplateStore.getState().updateActiveItem({ title: 'Updated Title' });

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem?.title).toBe('Updated Title');
      expect(activeItem?.content).toBe('Hello {name}!');
    });

    it('activeItem이 null이면 null을 유지해야 한다', () => {
      useTemplateStore.getState().updateActiveItem({ title: 'New Title' });

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem).toBeNull();
    });

    it('여러 필드를 동시에 업데이트할 수 있어야 한다', () => {
      useTemplateStore.setState({ activeItem: mockTemplate });

      useTemplateStore.getState().updateActiveItem({
        title: 'New Title',
        content: 'New Content',
        outputType: 'json',
      });

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem?.title).toBe('New Title');
      expect(activeItem?.content).toBe('New Content');
      expect(activeItem?.outputType).toBe('json');
    });

    it('variables를 업데이트할 수 있어야 한다', () => {
      useTemplateStore.setState({ activeItem: mockTemplate });

      const newVariables = [{ name: 'var1', description: 'Desc 1' }];
      useTemplateStore.getState().updateActiveItem({ variables: newVariables });

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem?.variables).toEqual(newVariables);
    });
  });

  describe('initializeActiveItem', () => {
    it('처음 호출 시 템플릿을 설정하고 isInitialized를 true로 설정해야 한다', () => {
      useTemplateStore.getState().initializeActiveItem(mockTemplate);

      const state = useTemplateStore.getState();
      expect(state.activeItem).toEqual(mockTemplate);
      expect(state.isInitialized).toBe(true);
      expect(state.saveStatus).toBe('idle');
    });

    it('이미 초기화된 경우 템플릿을 변경하지 않아야 한다', () => {
      useTemplateStore.setState({
        activeItem: mockTemplate,
        isInitialized: true,
      });

      const anotherTemplate: Template = {
        ...mockTemplate,
        id: 'template-2',
        title: 'Another Template',
      };

      useTemplateStore.getState().initializeActiveItem(anotherTemplate);

      const { activeItem } = useTemplateStore.getState();
      expect(activeItem?.id).toBe('template-1');
      expect(activeItem?.title).toBe('Test Template');
    });

    it('null로 호출하면 activeItem을 null로 설정해야 한다', () => {
      useTemplateStore.setState({ activeItem: mockTemplate });

      useTemplateStore.getState().initializeActiveItem(null);

      const state = useTemplateStore.getState();
      expect(state.activeItem).toBeNull();
      expect(state.saveStatus).toBe('idle');
    });

    it('null로 호출해도 isInitialized는 변경되지 않아야 한다', () => {
      useTemplateStore.setState({
        activeItem: mockTemplate,
        isInitialized: true,
      });

      useTemplateStore.getState().initializeActiveItem(null);

      const { isInitialized } = useTemplateStore.getState();
      expect(isInitialized).toBe(true);
    });
  });

  describe('setSaveStatus', () => {
    it('saveStatus를 idle로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setSaveStatus('idle');

      expect(useTemplateStore.getState().saveStatus).toBe('idle');
    });

    it('saveStatus를 editing으로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setSaveStatus('editing');

      expect(useTemplateStore.getState().saveStatus).toBe('editing');
    });

    it('saveStatus를 saving으로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setSaveStatus('saving');

      expect(useTemplateStore.getState().saveStatus).toBe('saving');
    });

    it('saveStatus를 saved로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setSaveStatus('saved');

      expect(useTemplateStore.getState().saveStatus).toBe('saved');
    });

    it('saveStatus를 error로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setSaveStatus('error');

      expect(useTemplateStore.getState().saveStatus).toBe('error');
    });
  });

  describe('setShowOutputTypeBlock', () => {
    it('showOutputTypeBlock을 true로 설정할 수 있어야 한다', () => {
      useTemplateStore.getState().setShowOutputTypeBlock(true);

      expect(useTemplateStore.getState().showOutputTypeBlock).toBe(true);
    });

    it('showOutputTypeBlock을 false로 설정할 수 있어야 한다', () => {
      useTemplateStore.setState({ showOutputTypeBlock: true });

      useTemplateStore.getState().setShowOutputTypeBlock(false);

      expect(useTemplateStore.getState().showOutputTypeBlock).toBe(false);
    });
  });
});
