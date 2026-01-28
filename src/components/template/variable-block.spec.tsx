import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { VariableBlock } from './variable-block';

const DEFAULT_PLACEHOLDER = '예: 영어로 번역 할 단어를 입력하세요';

describe('VariableBlock', () => {
  const mockVariable = { name: 'testVar', description: null };

  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('activeItem이 없으면 null을 반환해야 한다', () => {
    const { container } = render(<VariableBlock variable={mockVariable} />);

    expect(container.firstChild).toBeNull();
  });

  it('변수 이름이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [mockVariable],
        outputType: null,
      },
    });

    render(<VariableBlock variable={mockVariable} />);

    expect(screen.getByText('{testVar}')).toBeInTheDocument();
  });

  it('설명이 없을 때 기본 텍스트가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [mockVariable],
        outputType: null,
      },
    });

    render(<VariableBlock variable={mockVariable} />);

    expect(screen.getByText(DEFAULT_PLACEHOLDER)).toBeInTheDocument();
  });

  it('설명이 있을 때 표시되어야 한다', () => {
    const variableWithDesc = { name: 'testVar', description: 'This is a test variable' };
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [variableWithDesc],
        outputType: null,
      },
    });

    render(<VariableBlock variable={variableWithDesc} />);

    expect(screen.getByText('This is a test variable')).toBeInTheDocument();
  });

  it('클릭 시 편집 모드가 되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [mockVariable],
        outputType: null,
      },
    });

    render(<VariableBlock variable={mockVariable} />);

    await user.click(screen.getByText(DEFAULT_PLACEHOLDER));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('편집 모드에서 입력 시 실시간으로 저장되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [mockVariable],
        outputType: null,
      },
    });

    render(<VariableBlock variable={mockVariable} />);

    await user.click(screen.getByText(DEFAULT_PLACEHOLDER));

    const input = screen.getByRole('textbox');
    await user.type(input, 'New description');

    const state = useTemplateStore.getState();
    const updatedVar = state.activeItem?.variables.find((v) => v.name === 'testVar');
    expect(updatedVar?.description).toBe('New description');
  });

  it('편집 모드에서 Enter 키로 편집 모드가 종료되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [mockVariable],
        outputType: null,
      },
    });

    render(<VariableBlock variable={mockVariable} />);

    await user.click(screen.getByText(DEFAULT_PLACEHOLDER));

    const input = screen.getByRole('textbox');
    await user.type(input, 'Enter test{Enter}');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
