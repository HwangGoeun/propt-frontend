import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { PreviewCard } from './preview-card';

describe('PreviewCard', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('activeItem이 없으면 null을 반환해야 한다', () => {
    const { container } = render(<PreviewCard />);

    expect(container.firstChild).toBeNull();
  });

  it('activeItem이 있으면 제목이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test Template',
        content: 'Hello {name}',
        variables: [{ name: 'name', description: null }],
        outputType: null,
      },
    });

    render(<PreviewCard />);

    expect(screen.getByText(/Test Template/)).toBeInTheDocument();
  });

  it('변수가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello {name}',
        variables: [
          { name: 'name', description: null },
          { name: 'age', description: null },
        ],
        outputType: null,
      },
    });

    render(<PreviewCard />);

    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('age:')).toBeInTheDocument();
  });

  it('outputType이 있으면 지시문이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<PreviewCard />);

    expect(screen.getByText(/마크다운 형식으로/)).toBeInTheDocument();
  });

  it('outputType이 없으면 지시문이 표시되지 않아야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello',
        variables: [],
        outputType: null,
      },
    });

    render(<PreviewCard />);

    expect(screen.queryByText(/형식으로 작성/)).not.toBeInTheDocument();
  });

  it('실행 안내 텍스트가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: 'Hello',
        variables: [],
        outputType: null,
      },
    });

    render(<PreviewCard />);

    expect(screen.getByText(/입력 완료 후 실행/)).toBeInTheDocument();
  });

  it('변수가 없을 때도 렌더링되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'No Variables',
        content: 'Static content',
        variables: [],
        outputType: null,
      },
    });

    render(<PreviewCard />);

    expect(screen.getByText(/No Variables/)).toBeInTheDocument();
  });
});
