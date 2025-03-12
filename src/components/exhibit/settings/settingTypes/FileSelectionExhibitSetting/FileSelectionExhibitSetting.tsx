import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type FunctionComponent,
} from 'react';
import { FileSetting } from '../../../../../app/entities/exhibitManifest';
import { useGetExhibitFilesQuery } from '../../../../../app/services/files';
import { isNil } from '../../../../../utils/lang';
import { MenuItem } from '../../../../common/MenuItem';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface FileSelectionExhibitSettingProps {
  exhibitId: number;
  setting: FileSetting;
  updatedValue?: FileSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: FileSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const FileSelectionExhibitSetting: FunctionComponent<
  FileSelectionExhibitSettingProps
> = ({ exhibitId, setting, updatedValue, onChange, disabled }) => {
  const { data: fileData, isLoading } = useGetExhibitFilesQuery({ exhibitId });
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value || null;
      onChange(
        setting.id,
        setting.manifestId,
        newValue,
        newValue === setting.value || (isNil(newValue) && isNil(setting.value))
      );
    },
    [onChange, setting.id, setting.manifestId, setting.value]
  );

  const displayedValue = useMemo(
    () => (updatedValue !== undefined ? updatedValue : setting.value ?? ''),
    [setting.value, updatedValue]
  );

  return (
    <MainPanelCoplanarSubpageBlockRow className='FileSelectionExhibitSetting'>
      <TextField
        label={
          <SettingLabelWrapper
            changed={!isNil(updatedValue) && updatedValue !== setting.value}
          >
            {setting.display}
          </SettingLabelWrapper>
        }
        fullWidth
        select
        orientation='horizontal'
        placeholder=''
        disabled={disabled || !setting.write || isLoading}
        value={displayedValue}
        onChange={handleOnChange}
      >
        {displayedValue !== '' && (
          <MenuItem
            key='emptyFile'
            value={undefined}
            title='Clear File Selection'
          >
            Clear File Selection
          </MenuItem>
        )}
        {fileData?.files?.map((file) => (
          <MenuItem
            key={`setting-${setting.id}${file.file}`}
            value={file.file}
            title={file.file}
          >
            {file.file}
          </MenuItem>
        ))}
      </TextField>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
