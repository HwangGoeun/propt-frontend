import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserInfo } from './user-info';

describe('UserInfo', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
  };

  it('사용자 이름이 표시되어야 한다', () => {
    render(<UserInfo user={mockUser} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('사용자 이메일이 표시되어야 한다', () => {
    render(<UserInfo user={mockUser} />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('이니셜이 표시되어야 한다', () => {
    render(<UserInfo user={mockUser} />);

    // "Test User" -> "TU"
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('단일 이름일 때 이니셜이 올바르게 표시되어야 한다', () => {
    const singleNameUser = { ...mockUser, name: 'Alice' };
    render(<UserInfo user={singleNameUser} />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('세 단어 이상의 이름일 때 처음 두 글자만 표시해야 한다', () => {
    const longNameUser = { ...mockUser, name: 'John Middle Doe' };
    render(<UserInfo user={longNameUser} />);

    expect(screen.getByText('JM')).toBeInTheDocument();
  });

  it('소문자 이름도 대문자로 변환해야 한다', () => {
    const lowercaseUser = { ...mockUser, name: 'test user' };
    render(<UserInfo user={lowercaseUser} />);

    expect(screen.getByText('TU')).toBeInTheDocument();
  });
});
