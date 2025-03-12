import { Status } from '../../../../app/entities/exhibitManifest';
import { sortCompareObjectByOrderAndStringField } from '../../../../utils/sort';

export type StatusSort = Pick<Status, 'display' | 'order'>;

export const sortStatuses = sortCompareObjectByOrderAndStringField<StatusSort>(
  'order',
  'display'
);
