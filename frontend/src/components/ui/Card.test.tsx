import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { expect, test } from 'vitest';

test('renders card content', () => {
  render(<Card>Test Content</Card>);
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});

test('applies custom variant', () => {
  const { container } = render(<Card variant="warm">Warm Card</Card>);
  expect(container.firstChild).toHaveClass('shadow-[4px_4px_0px_0px_rgba(242,233,220,1)]');
});
