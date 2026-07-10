import { render } from '@testing-library/react';
import { SkeletonLoader } from './SkeletonLoader';
import { expect, test } from 'vitest';

test('renders skeleton loader with woven background', () => {
  const { container } = render(<SkeletonLoader className="h-10" />);
  expect(container.firstChild).toHaveClass('h-10');
  expect(container.querySelector('.woven-bg')).toBeInTheDocument();
});
