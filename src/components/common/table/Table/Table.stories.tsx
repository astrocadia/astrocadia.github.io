import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Table } from './Table';
import { TableContainer } from '../TableContainer';
import { TableHead } from '../TableHead';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { TableBody } from '../TableBody';

const meta: Meta<typeof Table> = {
  title: 'Design System/Components/Table',
  tags: ['autodocs'],
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

function createDefaultRows(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const defaultRows = [
  createDefaultRows('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createDefaultRows('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createDefaultRows('Eclair', 262, 16.0, 24, 6.0),
  createDefaultRows('Cupcake', 305, 3.7, 67, 4.3),
  createDefaultRows('Gingerbread', 356, 16.0, 49, 3.9),
];

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaultRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProviderWrapper>
  ),
};
