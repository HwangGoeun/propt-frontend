import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import McpCodePage from './mcp-code';

describe('McpCodePage', () => {
  const mockWriteText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
    vi.clearAllMocks();
  });

  it('코드가 없을 때 에러 메시지를 표시해야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('❌ 오류')).toBeInTheDocument();
    expect(screen.getByText('코드가 없습니다. 다시 로그인해주세요.')).toBeInTheDocument();
  });

  it('코드가 있을 때 성공 페이지를 표시해야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('로그인 성공!')).toBeInTheDocument();
    expect(screen.getByText('아래 코드를 MCP에 입력하세요')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('복사 버튼이 표시되어야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('📋 코드 복사')).toBeInTheDocument();
  });

  it('복사 버튼이 클릭 가능해야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    const copyButton = screen.getByRole('button', { name: /코드 복사/ });
    expect(copyButton).not.toBeDisabled();
  });

  it('복사 후 "복사됨" 텍스트로 변경되어야 한다', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('📋 코드 복사'));

    expect(screen.getByText('✅ 복사됨')).toBeInTheDocument();
  });

  it('만료 안내 텍스트가 표시되어야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/코드는 3분 후 만료됩니다/)).toBeInTheDocument();
  });

  it('Propt 로고가 표시되어야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/mcp/code?code=ABC123']}>
        <McpCodePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Propt')).toBeInTheDocument();
  });
});
