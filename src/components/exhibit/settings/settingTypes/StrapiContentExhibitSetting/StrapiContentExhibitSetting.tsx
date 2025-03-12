import { skipToken } from '@reduxjs/toolkit/query';
import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type FunctionComponent,
} from 'react';
import type {
  StrapiOption,
  StrapiSetting,
} from '../../../../../app/entities/exhibitManifest';
import { useGetExhibitQuery } from '../../../../../app/services/exhibit';
import { useGetStrapiOptionsQuery } from '../../../../../app/services/strapi';
import {
  useGetWorkspaceQuery,
  useGetWorkspaceStrapiApiJwtQuery,
  useGetWorkspaceUserStrapiLoginJwtQuery,
} from '../../../../../app/services/workspace';
import { isNil } from '../../../../../utils/lang';
import { sortCompareObjectByStringField } from '../../../../../utils/sort';
import { StringFields } from '../../../../../utils/usefulTS';
import { FormControl } from '../../../../common/FormControl';
import { FormLabel } from '../../../../common/FormLabel';
import { ErrorIcon } from '../../../../common/icons';
import { MenuItem } from '../../../../common/MenuItem';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { StrapiContentLink } from '../../../../StrapiContentLink';
import { getStrapiUrlFromWorkspace } from '../../../common/utils/strapiUtils';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';
import './StrapiContentExhibitSetting.css';

const IS_STRAPI_CONTENT = true as const;

interface StrapiContentExhibitSettingProps {
  exhibitId: number;
  setting: StrapiSetting;
  updatedValue?: string | null;
  onChange: (
    id: number,
    manifestId: string,
    value: string | null,
    reset: boolean,
    isStrapiSetting: typeof IS_STRAPI_CONTENT
  ) => void;
  disabled?: boolean;
}

export const StrapiContentExhibitSetting: FunctionComponent<
  StrapiContentExhibitSettingProps
> = ({ exhibitId, setting, updatedValue, onChange, disabled }) => {
  // get setting values
  const {
    id,
    manifestId,
    contentType,
    displayFieldName,
    value: currentStrapiOption,
  } = setting;
  const STRAPI_OPTIONS_ERROR = `Unable to load "${contentType}" from Strapi`;
  const STRAPI_API_ERROR = 'Unable to connect Strapi';
  const currentStrapiOptionId = currentStrapiOption?.id?.toString();

  // get exhibit workspace, and user
  const { data: exhibit, isLoading: isExhibitLoading } = useGetExhibitQuery({
    exhibitId,
  });
  const workspaceId = exhibit?.organizationId;
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspaceQuery(workspaceId ? { workspaceId } : skipToken);

  // get Strapi URL
  const workspaceStrapiUrl: string | undefined = useMemo(() => {
    return workspace ? getStrapiUrlFromWorkspace(workspace) : undefined;
  }, [workspace]);

  // get strapi API JWT for making calls to get Strapi Options
  const {
    data: strapiApiJwtData,
    isLoading: isStrapiApiLoading,
    isError: isStrapiApiError,
  } = useGetWorkspaceStrapiApiJwtQuery(
    workspaceId ? { workspaceId } : skipToken
  );

  // get Strapi Options for dropdown
  const {
    data: options,
    isError: isStrapiOptionsError,
    refetch: reloadStrapiOptions,
    isFetching: areStrapiOptionsFetching,
  } = useGetStrapiOptionsQuery(
    strapiApiJwtData && workspaceStrapiUrl
      ? {
          strapiUrl: workspaceStrapiUrl,
          contentType,
          jwt: strapiApiJwtData.jwt,
        }
      : skipToken
  );

  // get Strapi Login JWT for Strapi iframe modal
  const {
    data: strapiLoginJwt,
    isLoading: isStrapiLoginJwtLoading,
    isError: isStrapiLoginJwtError,
  } = useGetWorkspaceUserStrapiLoginJwtQuery(
    workspaceId ? { workspaceId } : skipToken
  );

  const isLoading = useMemo(
    () =>
      isExhibitLoading ||
      isWorkspaceLoading ||
      isStrapiApiLoading ||
      isStrapiLoginJwtLoading,
    [
      isExhibitLoading,
      isWorkspaceLoading,
      isStrapiApiLoading,
      isStrapiLoginJwtLoading,
    ]
  );

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.toString();
      onChange(
        id,
        manifestId,
        newValue,
        newValue === currentStrapiOptionId,
        IS_STRAPI_CONTENT
      );
    },
    [currentStrapiOptionId, onChange, id, manifestId]
  );

  const sortedOptions: Array<StrapiOption> = useMemo(
    () =>
      options
        ? [...options]
            .map((option: StrapiOption) => ({
              ...option,
              [displayFieldName]: option[displayFieldName] || '',
            }))
            .sort(
              sortCompareObjectByStringField(
                displayFieldName as StringFields<StrapiOption>,
                true
              )
            )
        : [],
    [options, displayFieldName]
  );

  return (
    !isLoading && (
      <MainPanelCoplanarSubpageBlockRow className='StrapiContentExhibitSetting'>
        {(!workspaceStrapiUrl || isStrapiApiError || isStrapiOptionsError) && (
          <FormControl fullWidth orientation='horizontal'>
            <SettingLabelWrapper className='StrapiContentExhibitSetting__errorDisplayName'>
              <FormLabel>{setting.display}</FormLabel>
            </SettingLabelWrapper>
            <div className='StrapiContentExhibitSetting__error'>
              <ErrorIcon />
              {!isStrapiOptionsError ? STRAPI_API_ERROR : STRAPI_OPTIONS_ERROR}
            </div>
          </FormControl>
        )}
        {strapiApiJwtData &&
          options &&
          !isStrapiApiError &&
          !isStrapiOptionsError && (
            <TextField
              label={
                <SettingLabelWrapper
                  changed={
                    !isNil(updatedValue) &&
                    updatedValue !== currentStrapiOptionId
                  }
                >
                  {setting.display}
                </SettingLabelWrapper>
              }
              fullWidth
              select
              orientation='horizontal'
              placeholder=''
              disabled={disabled}
              value={
                !isNil(updatedValue)
                  ? updatedValue
                  : currentStrapiOptionId ?? ''
              }
              onChange={handleOnChange}
            >
              {!areStrapiOptionsFetching &&
                sortedOptions?.map((option) => (
                  <MenuItem
                    key={`setting-${setting.id}${option.id}`}
                    value={option.id}
                    title={option[displayFieldName] as string}
                  >
                    {option[displayFieldName] as string}
                  </MenuItem>
                ))}
              {areStrapiOptionsFetching && (
                <MenuItem disabled>loading...</MenuItem>
              )}
            </TextField>
          )}
        {workspace && strapiLoginJwt && !isStrapiLoginJwtError && (
          <div className='StrapiContentExhibitSetting__contentLinkWrapper'>
            <StrapiContentLink
              key='strapiLink'
              value={null}
              contentType={!isStrapiOptionsError ? contentType : 'media'}
              organization={workspace}
              strapiUserEmail={strapiLoginJwt.user.email}
              strapiJwt={strapiLoginJwt.token}
              onReloadStrapiOptions={reloadStrapiOptions}
              initializeIframeOnLoad
              buttonVariant='iconButton'
            />
          </div>
        )}
      </MainPanelCoplanarSubpageBlockRow>
    )
  );
};
