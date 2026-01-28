import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

describe('Card', () => {
  describe('Card', () => {
    it('Card가 렌더링되어야 한다', () => {
      render(<Card>Card Content</Card>);

      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<Card>Content</Card>);

      expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'card');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<Card className="custom-class">Content</Card>);

      expect(screen.getByText('Content')).toHaveClass('custom-class');
    });
  });

  describe('CardHeader', () => {
    it('CardHeader가 렌더링되어야 한다', () => {
      render(<CardHeader>Header Content</CardHeader>);

      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardHeader>Header</CardHeader>);

      expect(screen.getByText('Header')).toHaveAttribute('data-slot', 'card-header');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardHeader className="header-class">Header</CardHeader>);

      expect(screen.getByText('Header')).toHaveClass('header-class');
    });
  });

  describe('CardTitle', () => {
    it('CardTitle이 렌더링되어야 한다', () => {
      render(<CardTitle>Title</CardTitle>);

      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardTitle>Title</CardTitle>);

      expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'card-title');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardTitle className="title-class">Title</CardTitle>);

      expect(screen.getByText('Title')).toHaveClass('title-class');
    });
  });

  describe('CardDescription', () => {
    it('CardDescription이 렌더링되어야 한다', () => {
      render(<CardDescription>Description</CardDescription>);

      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardDescription>Desc</CardDescription>);

      expect(screen.getByText('Desc')).toHaveAttribute('data-slot', 'card-description');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardDescription className="desc-class">Desc</CardDescription>);

      expect(screen.getByText('Desc')).toHaveClass('desc-class');
    });
  });

  describe('CardAction', () => {
    it('CardAction이 렌더링되어야 한다', () => {
      render(<CardAction>Action</CardAction>);

      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardAction>Action</CardAction>);

      expect(screen.getByText('Action')).toHaveAttribute('data-slot', 'card-action');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardAction className="action-class">Action</CardAction>);

      expect(screen.getByText('Action')).toHaveClass('action-class');
    });
  });

  describe('CardContent', () => {
    it('CardContent가 렌더링되어야 한다', () => {
      render(<CardContent>Content</CardContent>);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardContent>Content</CardContent>);

      expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'card-content');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardContent className="content-class">Content</CardContent>);

      expect(screen.getByText('Content')).toHaveClass('content-class');
    });
  });

  describe('CardFooter', () => {
    it('CardFooter가 렌더링되어야 한다', () => {
      render(<CardFooter>Footer</CardFooter>);

      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('data-slot 속성이 있어야 한다', () => {
      render(<CardFooter>Footer</CardFooter>);

      expect(screen.getByText('Footer')).toHaveAttribute('data-slot', 'card-footer');
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<CardFooter className="footer-class">Footer</CardFooter>);

      expect(screen.getByText('Footer')).toHaveClass('footer-class');
    });
  });

  describe('조합 테스트', () => {
    it('모든 Card 컴포넌트가 함께 렌더링되어야 한다', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>,
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
