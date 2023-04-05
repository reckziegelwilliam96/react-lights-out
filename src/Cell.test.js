import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

it('renders Cell properly with isLit false', () => {
  const { getByRole } = render(<td><Cell flipCellsAroundMe={() => {}} isLit={false} /></td>);
  const cellElement = getByRole('cell');
  expect(cellElement).toBeInTheDocument();
  expect(cellElement).toHaveClass('Cell');
  expect(cellElement).not.toHaveClass('Cell-lit');
});

it('renders Cell properly with isLit true', () => {
  const { getByRole } = render(<td><Cell flipCellsAroundMe={() => {}} isLit={true} /></td>);
  const cellElement = getByRole('cell');
  expect(cellElement).toBeInTheDocument();
  expect(cellElement).toHaveClass('Cell');
  expect(cellElement).toHaveClass('Cell-lit');
});
