import cx from 'classnames';
import { FunctionComponent, type ReactNode } from 'react';
import { isNil } from '../../utils/lang';
import './DetailTable.css';

/* NOTES for future possibilitys:
 * This component meets the minimum requirements for the current use case.
 * It could be extended to support more complex layouts, such as:
 * 1. Horizontal vs vertical layout
 * 2. Ability to supply a custom class or a callback to render a className for
 *    each label or value cell
 * 3. Ability to supply a custom callback to render the contents of each label or value
 */

export interface DetailTableDatum {
  label: string;
  value?: ReactNode;
}

export interface DetailTableProps {
  className?: string;
  style?: React.CSSProperties;
  data?: Array<DetailTableDatum>;
}

export const DetailTable: FunctionComponent<DetailTableProps> = ({
  className,
  style,
  data,
}) =>
  !isNil(data) ? (
    <table className={cx('DetailTable', className)} style={style}>
      <tbody>
        {data.map(({ label, value }, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={idx}>
            <th className='DetailTable__header' scope='row'>
              {label}
            </th>
            <td className='DetailTable__value'>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
