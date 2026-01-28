import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { TextBlock } from './text-block';

describe('TextBlock', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('activeItem이 없으면 null을 반환해야 한다', () => {
    const { container } = render(<TextBlock />);

    expect(container.firstChild).toBeNull();
  });

  it('제목 "텍스트 입력"이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TextBlock />);

    expect(screen.getByText('텍스트 입력')).toBeInTheDocument();
  });

  it('텍스트 영역이 렌더링되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello {name}',
        variables: [{ name: 'name', description: null }],
        outputType: null,
      },
    });

    render(<TextBlock />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello {name}');
  });

  it('변수가 없을 때 안내 텍스트가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'No variables here',
        variables: [],
        outputType: null,
      },
    });

    render(<TextBlock />);

    expect(screen.getByText('{변수}를 입력해보세요!')).toBeInTheDocument();
  });

  it('변수가 있을 때 VariableBlock이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello {name}',
        variables: [{ name: 'name', description: null }],
        outputType: null,
      },
    });

    render(<TextBlock />);

    expect(screen.getByText('{name}')).toBeInTheDocument();
  });

  it('텍스트 입력 시 content가 업데이트되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TextBlock />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello world');

    const state = useTemplateStore.getState();
    expect(state.activeItem?.content).toBe('Hello world');
  });

  it('"변수 설정" 섹션이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<TextBlock />);

    expect(screen.getByText('변수 설정')).toBeInTheDocument();
  });
});
