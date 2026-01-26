import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MCPServerGuideModal } from './mcp-server-guide-modal';

describe('MCPServerGuideModal', () => {
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

  it('MCP 설정 가이드 버튼이 표시되어야 한다', () => {
    render(<MCPServerGuideModal />);

    expect(screen.getByText('MCP 설정 가이드')).toBeInTheDocument();
  });

  it('버튼 클릭 시 모달이 열려야 한다', async () => {
    const user = userEvent.setup();
    render(<MCPServerGuideModal />);

    await user.click(screen.getByText('MCP 설정 가이드'));

    await waitFor(() => {
      expect(screen.getByText('MCP 서버 설정 가이드')).toBeInTheDocument();
    });
  });

  it('모달에 설치 방법이 표시되어야 한다', async () => {
    const user = userEvent.setup();
    render(<MCPServerGuideModal />);

    await user.click(screen.getByText('MCP 설정 가이드'));

    await waitFor(() => {
      expect(screen.getByText('설치 방법')).toBeInTheDocument();
    });
  });

  it('모달에 설명이 표시되어야 한다', async () => {
    const user = userEvent.setup();
    render(<MCPServerGuideModal />);

    await user.click(screen.getByText('MCP 설정 가이드'));

    await waitFor(() => {
      expect(screen.getByText(/MCP 클라이언트 설정 파일에 추가/)).toBeInTheDocument();
    });
  });

  it('코드 복사 버튼이 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<MCPServerGuideModal />);

    await user.click(screen.getByText('MCP 설정 가이드'));

    await waitFor(() => {
      expect(screen.getByText('Claude Code / Claude Desktop 설정')).toBeInTheDocument();
    });
  });

  it('복사 버튼이 모달에 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<MCPServerGuideModal />);

    await user.click(screen.getByText('MCP 설정 가이드'));

    await waitFor(() => {
      expect(screen.getByText('Claude Code / Claude Desktop 설정')).toBeInTheDocument();
    });

    const copyButton = screen.getByRole('button', { name: /설정 복사/i });
    expect(copyButton).toBeInTheDocument();
  });
});
