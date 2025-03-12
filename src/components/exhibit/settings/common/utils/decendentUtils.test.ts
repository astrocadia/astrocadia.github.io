import { beforeAll, describe, expect, it } from 'vitest';
import { MANIFEST_ID_SEPARATOR } from '../../../../../app/entities/exhibitManifest';
import { hasDecendentChanged } from './decendentUtils';

const SIMPLE_LEAF_ID = 'Simple manifest id';
const PARENT_ID = 'Parent manifest id';
const CHILD_ID = `${PARENT_ID}${MANIFEST_ID_SEPARATOR}Child manifest id`;
const CHILD_WITH_CHILD_ID = `${PARENT_ID}${MANIFEST_ID_SEPARATOR}Child with child manifest id`;
const GRANDCHILD_ID = `${CHILD_WITH_CHILD_ID}${MANIFEST_ID_SEPARATOR}Grandchild manifest id`;

describe('Exhibit Settings Utils - decendentUtils', () => {
  let manifestIdsWithPendingChanges: Set<string>;

  beforeAll(() => {
    manifestIdsWithPendingChanges = new Set([
      SIMPLE_LEAF_ID,
      CHILD_ID,
      GRANDCHILD_ID,
    ]);
  });

  it('Handle undefined', () => {
    expect(hasDecendentChanged(SIMPLE_LEAF_ID)).toBe(false);
  });

  it('Should not find leaf node', () => {
    expect(
      hasDecendentChanged(SIMPLE_LEAF_ID, manifestIdsWithPendingChanges)
    ).toBe(false);
    expect(
      hasDecendentChanged(GRANDCHILD_ID, manifestIdsWithPendingChanges)
    ).toBe(false);
  });

  it('Should not find unknown id', () => {
    expect(
      hasDecendentChanged('randomeString', manifestIdsWithPendingChanges)
    ).toBe(false);
  });

  it('Should find direct child node', () => {
    expect(hasDecendentChanged(PARENT_ID, manifestIdsWithPendingChanges)).toBe(
      true
    );
    expect(
      hasDecendentChanged(CHILD_WITH_CHILD_ID, manifestIdsWithPendingChanges)
    ).toBe(true);
  });
});
