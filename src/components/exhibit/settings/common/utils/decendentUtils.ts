import {
  MANIFEST_ID_SEPARATOR,
  type Setting,
} from '../../../../../app/entities/exhibitManifest';

export const hasDecendentChanged = (
  listOrGroupManifestId: Setting['manifestId'],
  manifestIdsWithPendingChanges?: Set<Setting['manifestId']>
): boolean => {
  if (manifestIdsWithPendingChanges) {
    return Array.from(manifestIdsWithPendingChanges).some(
      (manifestIdWithChange) =>
        manifestIdWithChange.startsWith(
          `${listOrGroupManifestId}${MANIFEST_ID_SEPARATOR}`
        )
    );
  }

  return false;
};
