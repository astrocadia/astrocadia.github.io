import { type ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { exhaustiveGuard } from '../../../../utils/usefulTS';
import CustomApplicationImageSrcUrl from '../assets/ExhibitComponents-Type-CustomApplication.svg?url';
import GumbandDevelopmentBoardImage from '../assets/ExhibitComponents-Type-GumbandDevelopmentBoard.webp';
import GumbandPresenceSensorImage from '../assets/ExhibitComponents-Type-GumbandPresenceSensor.webp';
import OSMonitorImageSrcUrl from '../assets/ExhibitComponents-Type-OSMonitor.svg?url';

export const getImageSource = (type: ExhibitComponentSummary['type']) => {
  switch (type) {
    case 'custom-hardware':
      return GumbandDevelopmentBoardImage;
    case 'presence-sensor':
      return GumbandPresenceSensorImage;
    case 'os-monitor':
      return OSMonitorImageSrcUrl;
    case 'custom-application':
      return CustomApplicationImageSrcUrl;
    default:
      return exhaustiveGuard(type);
  }
};
