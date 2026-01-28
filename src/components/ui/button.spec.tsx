import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, buttonVariants } from './button';

describe('Button', () => {
  describe('렌더링', () => {
    it('기본 버튼이 렌더링되어야 한다', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('button 요소로 렌더링되어야 한다', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
    });
  });

  describe('variants', () => {
    it('default variant가 적용되어야 한다', () => {
      render(<Button variant="default">Default</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'default');
    });

    it('destructive variant가 적용되어야 한다', () => {
      render(<Button variant="destructive">Destructive</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive');
    });

    it('outline variant가 적용되어야 한다', () => {
      render(<Button variant="outline">Outline</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline');
    });

    it('secondary variant가 적용되어야 한다', () => {
      render(<Button variant="secondary">Secondary</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary');
    });

    it('ghost variant가 적용되어야 한다', () => {
      render(<Button variant="ghost">Ghost</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost');
    });

    it('link variant가 적용되어야 한다', () => {
      render(<Button variant="link">Link</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'link');
    });
  });

  describe('sizes', () => {
    it('default size가 적용되어야 한다', () => {
      render(<Button size="default">Default Size</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'default');
    });

    it('sm size가 적용되어야 한다', () => {
      render(<Button size="sm">Small</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm');
    });

    it('lg size가 적용되어야 한다', () => {
      render(<Button size="lg">Large</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg');
    });

    it('icon size가 적용되어야 한다', () => {
      render(<Button size="icon">Icon</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon');
    });
  });

  describe('상호작용', () => {
    it('클릭 이벤트가 호출되어야 한다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서 클릭이 동작하지 않아야 한다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick} disabled>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('asChild', () => {
    it('asChild가 true일 때 자식 요소가 렌더링되어야 한다', () => {
      render(
        <Button asChild>
          <a href="/link">Link Button</a>
        </Button>,
      );

      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/link');
    });
  });

  describe('className', () => {
    it('추가 className이 적용되어야 한다', () => {
      render(<Button className="custom-class">Custom</Button>);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('buttonVariants', () => {
    it('variants 함수가 클래스를 반환해야 한다', () => {
      const classes = buttonVariants({ variant: 'default', size: 'default' });

      expect(classes).toContain('bg-primary');
      expect(classes).toContain('text-primary-foreground');
    });

    it('destructive variant 클래스를 반환해야 한다', () => {
      const classes = buttonVariants({ variant: 'destructive' });

      expect(classes).toContain('bg-destructive');
    });

    it('sm size 클래스를 반환해야 한다', () => {
      const classes = buttonVariants({ size: 'sm' });

      expect(classes).toContain('h-8');
    });
  });
});
