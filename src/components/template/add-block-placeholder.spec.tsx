import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AddBlockPlaceholder } from './add-block-placeholder';

describe('AddBlockPlaceholder', () => {
  it('플레이스홀더가 렌더링되어야 한다', () => {
    render(<AddBlockPlaceholder />);

    expect(screen.getByText('왼쪽에서 옵션 블록을 클릭하세요')).toBeInTheDocument();
  });

  it('플러스 아이콘이 렌더링되어야 한다', () => {
    render(<AddBlockPlaceholder />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('dashed border 스타일이 적용되어야 한다', () => {
    render(<AddBlockPlaceholder />);

    const container = document.querySelector('.border-dashed');
    expect(container).toBeInTheDocument();
  });
});
