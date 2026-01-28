import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useTemplateStore } from '@/stores/template-store';

import { OutputTypeBlock } from './output-type-block';

describe('OutputTypeBlock', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      activeItem: null,
      isInitialized: false,
      saveStatus: 'idle',
      showOutputTypeBlock: false,
    });
  });

  it('activeItem이 없으면 null을 반환해야 한다', () => {
    const { container } = render(<OutputTypeBlock />);

    expect(container.firstChild).toBeNull();
  });

  it('제목 "형식 지정"이 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<OutputTypeBlock />);

    expect(screen.getByText('형식 지정')).toBeInTheDocument();
  });

  it('설명 텍스트가 표시되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<OutputTypeBlock />);

    expect(screen.getByText('결과를 다음 형식으로 작성해주세요')).toBeInTheDocument();
  });

  it('프리셋 버튼들이 렌더링되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<OutputTypeBlock />);

    expect(screen.getByText('마크다운')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('표')).toBeInTheDocument();
    expect(screen.getByText('리스트')).toBeInTheDocument();
    expect(screen.getByText('CSV')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

  it('현재 선택된 타입이 활성화되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'json',
      },
    });

    render(<OutputTypeBlock />);

    const jsonButton = screen.getByText('JSON');
    expect(jsonButton.closest('button')).toHaveAttribute('data-variant', 'default');
  });

  it('프리셋 버튼 클릭 시 outputType이 변경되어야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<OutputTypeBlock />);

    await user.click(screen.getByText('JSON'));

    const state = useTemplateStore.getState();
    expect(state.activeItem?.outputType).toBe('json');
  });

  it('닫기 버튼 클릭 시 삭제 확인 다이얼로그가 열려야 한다', async () => {
    const user = userEvent.setup();
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: 'markdown',
      },
    });

    render(<OutputTypeBlock />);

    const closeButton = screen.getByRole('button', { name: '' }); // X icon button
    await user.click(closeButton);

    expect(screen.getByText('형식 지정 삭제')).toBeInTheDocument();
  });

  it('outputType이 null일 때 markdown으로 초기화되어야 한다', () => {
    useTemplateStore.setState({
      activeItem: {
        id: '1',
        title: 'Test',
        content: '',
        variables: [],
        outputType: null,
      },
    });

    render(<OutputTypeBlock />);

    const state = useTemplateStore.getState();
    expect(state.activeItem?.outputType).toBe('markdown');
  });
});
