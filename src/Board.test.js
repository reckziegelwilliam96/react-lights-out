import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

test('renders Board with a predefined initial state', () => {

  const { container } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
  );

  expect(container).toMatchSnapshot();
});

test("flips the right cells when a cell is clicked", () => {
    const { container } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1} />);
  
    const litCellsBeforeClick = container.querySelectorAll(".Cell-lit");
  
    fireEvent.click(litCellsBeforeClick[12]); // Click on the center cell
  
    const litCellsAfterClick = container.querySelectorAll(".Cell-lit");
  
    expect(litCellsAfterClick.length).toBe(20);
  });