import {
  CheckCircleIcon,
  CloudDisconnectedIcon,
  ContentCopyIcon,
  ErrorIcon,
  InfoIcon,
  SpinnerIcon,
} from '../../common/icons';
import type { ToastTypeIconMap } from '../Toast';

export const TOAST_TYPE_ICONS: ToastTypeIconMap = {
  copy: ContentCopyIcon,
  error: ErrorIcon,
  error_connection: CloudDisconnectedIcon,
  info: InfoIcon,
  loading: SpinnerIcon,
  success: CheckCircleIcon,
  plain: undefined,
} as const;
