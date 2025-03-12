import {
  type FunctionComponent,
  type ReactNode,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import Papa, { type ParseResult } from 'papaparse';
import cx from 'classnames';
import { CSVLink } from 'react-csv';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { useIntersectionObserver } from '../../../../../../common/hooks/useIntersectionObserver';
import { formatDateTime } from '../../../../../../../utils/date';
import { Button } from '../../../../../../common/buttons/Button';
import { ActionTriggerButton } from '../../../../../../common/ActionTriggerButton';
import { IconButton } from '../../../../../../common/buttons/IconButton';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { CustomHardwarePropertyArraySkeletonRow } from '../CustomHardwarePropertyArraySkeletonRow';
import {
  RefreshIcon,
  DownloadIcon,
  ChevronIcon,
  UploadIcon,
} from '../../../../../../common/icons';
import { SettingLabelWrapper } from '../../../../../settings/SettingLabelWrapper';
import {
  ARRAY_SUBPAGE_RENDERED_FIELDS_END_INDEX_INCREMENT_LENGTH,
  ARRAY_SUBPAGE_MAX_RENDERED_FIELDS,
  ARRAY_PREVIEW_MAX_RENDERED_FIELDS,
} from '../../../../utils/constants';
import './CustomHardwarePropertyArrayWrapper.css';

interface CustomHardwarePropertyArrayWrapperProps {
  propertyName: string;
  propertyLength: number;
  disabled?: boolean;
  sendDisabled?: boolean;
  downloadData: string;
  propertyChanged: boolean;
  settable: boolean;
  loading: boolean;
  success: boolean;
  showRefreshButton: boolean;
  onRefresh: () => void;
  onSendValue: () => void;
  onUpdate: (data: Array<string>) => void;
  children: ReactNode;
  className: string;
  arraySubpage: boolean;
  onSetArraySubpage: () => void;
  onArraySubpageBack: () => void;
  renderedFieldsEndIndex: number;
  setRenderedFieldsEndIndex: Dispatch<SetStateAction<number>>;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const CustomHardwarePropertyArrayWrapper: FunctionComponent<
  CustomHardwarePropertyArrayWrapperProps
> = ({
  propertyName,
  propertyLength,
  propertyChanged,
  settable,
  disabled,
  sendDisabled,
  downloadData,
  onRefresh,
  onSendValue,
  onUpdate,
  showRefreshButton,
  loading,
  success,
  children,
  className,
  arraySubpage,
  onSetArraySubpage,
  onArraySubpageBack,
  renderedFieldsEndIndex,
  setRenderedFieldsEndIndex,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<DateTime>(
    DateTime.now()
  );
  const [isRenderingArrayItems, setIsRenderingArrayItems] =
    useState<boolean>(true);

  const topLoaderFieldRef = useRef<HTMLDivElement | null>(null);
  const bottomLoaderFieldRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (arraySubpage) {
      setRenderedFieldsEndIndex(
        Math.min(propertyLength, ARRAY_SUBPAGE_MAX_RENDERED_FIELDS)
      );
      return;
    }
    setRenderedFieldsEndIndex(
      Math.min(propertyLength, ARRAY_PREVIEW_MAX_RENDERED_FIELDS)
    );
  }, [propertyLength, arraySubpage, setRenderedFieldsEndIndex]);

  const handleClick = () => {
    setCurrentDateTime(DateTime.now());
  };

  useIntersectionObserver(
    topLoaderFieldRef,
    { root: null, rootMargin: '0px', threshold: 0.5 },
    (entry) => {
      if (entry.isIntersecting) {
        if (containerRef.current) {
          containerRef.current.scrollTop = 75;
        }
        setRenderedFieldsEndIndex((prev) =>
          Math.min(
            propertyLength,
            Math.max(
              ARRAY_SUBPAGE_RENDERED_FIELDS_END_INDEX_INCREMENT_LENGTH,
              prev - ARRAY_SUBPAGE_RENDERED_FIELDS_END_INDEX_INCREMENT_LENGTH
            )
          )
        );
      }
    }
  );

  useIntersectionObserver(
    bottomLoaderFieldRef,
    { root: null, rootMargin: '0px', threshold: 0.5 },
    (entry) => {
      if (entry.isIntersecting) {
        setRenderedFieldsEndIndex((prev) =>
          Math.min(
            propertyLength,
            prev + ARRAY_SUBPAGE_RENDERED_FIELDS_END_INDEX_INCREMENT_LENGTH
          )
        );
      }
    }
  );

  const generateFilename = () => {
    return `${propertyName}_${formatDateTime(currentDateTime, { hideUTCOffset: true })}`.replace(
      /\s+/g,
      '_'
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results: ParseResult<Array<string>>) => {
          onUpdate(results.data[0].slice(0, propertyLength));
        },
      });
    }
    fileInput.value = '';
  };

  const handleSetArraySubpage = useCallback(() => {
    onSetArraySubpage();
    setIsRenderingArrayItems(true);
  }, [onSetArraySubpage]);

  useEffect(() => {
    setIsRenderingArrayItems(false);
  }, [arraySubpage]);

  return !arraySubpage ? (
    <MainPanelCoplanarSubpageBlockRow
      className={cx('CustomHardwarePropertyArrayWrapper', className)}
    >
      <div className='CustomHardwarePropertyArrayWrapper__labelAndActionWrapper'>
        <SettingLabelWrapper
          className='CustomHardwarePropertyArrayWrapper__labelWrapper'
          changed={propertyChanged}
        >
          {propertyName}
        </SettingLabelWrapper>
        <div className='CustomHardwarePropertyArrayWrapper__actionButtonWrapper'>
          {showRefreshButton && !(loading || success) && (
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          )}
          {settable && (
            <IconButton
              className='CustomHardwarePropertyArrayWrapper__uploadButton'
              component='label'
              role={undefined}
              disabled={disabled}
              tabIndex={-1}
            >
              <UploadIcon />
              <VisuallyHiddenInput
                type='file'
                accept='.csv'
                onChange={handleFileChange}
              />
            </IconButton>
          )}
          <CSVLink
            data={downloadData}
            onClick={handleClick}
            filename={generateFilename()}
            separator=','
            tabIndex={-1}
          >
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </CSVLink>
          {settable && (
            <ActionTriggerButton
              busy={loading}
              success={success}
              disabled={disabled || sendDisabled}
              onClick={onSendValue}
            />
          )}
        </div>
      </div>
      {!isRenderingArrayItems && children}
      {propertyLength > 3 && (
        <Button
          className='CustomHardwarePropertyArrayWrapper__viewAllButton'
          onClick={handleSetArraySubpage}
        >
          {`View ${propertyLength} Values`} <ChevronIcon />
        </Button>
      )}
    </MainPanelCoplanarSubpageBlockRow>
  ) : (
    <div className={cx('CustomHardwarePropertyArrayWrapper', className)}>
      <div className='CustomHardwarePropertyArrayWrapper__subpage'>
        <div className='CustomHardwarePropertyArrayWrapper__labelAndActionWrapper'>
          <SettingLabelWrapper
            className='CustomHardwarePropertyArrayWrapper__labelWrapper'
            changed={propertyChanged}
          >
            <IconButton
              className='CustomHardwarePropertyArrayWrapper__subpageBackButton'
              onClick={onArraySubpageBack}
            >
              <ChevronIcon />
            </IconButton>
            {propertyName}
          </SettingLabelWrapper>
          <div className='CustomHardwarePropertyArrayWrapper__actionButtonWrapper'>
            {showRefreshButton && !(loading || success) && (
              <IconButton onClick={onRefresh}>
                <RefreshIcon />
              </IconButton>
            )}
            {settable && (
              <IconButton
                className='CustomHardwarePropertyArrayWrapper__uploadButton'
                component='label'
                role={undefined}
                disabled={disabled}
                tabIndex={-1}
              >
                <UploadIcon />
                <VisuallyHiddenInput
                  type='file'
                  accept='.csv'
                  onChange={handleFileChange}
                />
              </IconButton>
            )}
            <CSVLink
              data={downloadData}
              onClick={handleClick}
              filename={generateFilename()}
              separator=','
              tabIndex={-1}
            >
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </CSVLink>
            {settable && (
              <ActionTriggerButton
                busy={loading}
                success={success}
                disabled={disabled || sendDisabled}
                onClick={onSendValue}
              />
            )}
          </div>
        </div>
        {!isRenderingArrayItems && (
          <div
            className='CustomHardwarePropertyArrayWrapper__subpageValues'
            ref={containerRef}
          >
            {renderedFieldsEndIndex > ARRAY_SUBPAGE_MAX_RENDERED_FIELDS && (
              <CustomHardwarePropertyArraySkeletonRow ref={topLoaderFieldRef} />
            )}
            {children}
            {renderedFieldsEndIndex < propertyLength && (
              <CustomHardwarePropertyArraySkeletonRow
                ref={bottomLoaderFieldRef}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
