import {
  useCallback,
  useEffect,
  useState,
  type FunctionComponent,
} from 'react';
import { Button } from '../common/buttons';
import { IconButton } from '../common/buttons/IconButton';
import {
  getAdminURL,
  getStrapiUrlFromWorkspace,
} from '../exhibit/common/utils/strapiUtils';
import type { Workspace } from '../../app/services/workspace';
import { Modal } from '../common/Modal';
import './StrapiContentLink.css';
import { EditFileIcon } from '../common/icons';

export type ContentType = 'media' | 'mediaLibrary';

export type StrapiContentLinkProps = {
  value: string | null;
  contentType: ContentType | string;
  organization: Workspace;
  strapiUserEmail: string;
  strapiJwt: string;
  onReloadStrapiOptions?: () => void;
  linkText?: string;
  initializeIframeOnLoad?: boolean;
  buttonVariant?: 'primary' | 'iconButton';
};

/**
 * NOTE: This is a port of legacy code, so this could be improved.
 */
export const StrapiContentLink: FunctionComponent<StrapiContentLinkProps> = ({
  value,
  contentType,
  organization,
  strapiUserEmail,
  strapiJwt,
  onReloadStrapiOptions,
  linkText = 'Open Content',
  initializeIframeOnLoad,
  buttonVariant = 'primary',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [loadIframe, setLoadIframe] = useState(!!initializeIframeOnLoad);
  const [modalUrl, setModalUrl] = useState('');

  const getStrapiUrls = useCallback(
    (strapiUrl: string) => {
      if (strapiUrl === '') {
        return {
          editLink: '',
          createLink: '',
          mediaLink: '',
          mediaLibraryLink: '',
        };
      }

      let strapiContentType: ContentType | string = contentType;
      const adminUrl = getAdminURL(strapiUrl);
      // TODO *** Hotfix for Exhibits in Production with plural contentType mismatches ***
      if (
        adminUrl.includes('meta') &&
        strapiContentType === 'burlingame-environment-presets'
      ) {
        // meta
        strapiContentType = 'burlingame-environment-preset';
      } else if (
        adminUrl.includes('stag') &&
        strapiContentType === 'case-study-groups'
      ) {
        // stripe
        strapiContentType = 'case-study-group';
      } else if (
        adminUrl.includes('ergomotion') &&
        strapiContentType === 'ergomotion-experiences'
      ) {
        // yeti ergomotion
        strapiContentType = 'ergomotion-experience';
      } else if (adminUrl.includes('tiktok')) {
        // tiktok
        if (strapiContentType === 'creator-showcase-playlists') {
          strapiContentType = 'creator-showcase-playlist';
        } else if (strapiContentType === 'security-hub-playlists') {
          strapiContentType = 'security-hub-playlist';
        }
      }
      const strapiContentValuesUrl = `${adminUrl}/plugins/content-manager/collectionType/application::${strapiContentType}.${strapiContentType}?page=1&pageSize=10&_sort=id:ASC&`;
      const strapiSelectedValueUrl = `${adminUrl}/plugins/content-manager/collectionType/application::${strapiContentType}.${strapiContentType}/${value}?`;
      const strapiMediaUrl = `${adminUrl}/plugins/upload?_q=${encodeURIComponent(
        value || ''
      )}&`;
      const strapiMediaLibraryUrl = `${adminUrl}/plugins/upload?`;

      const loginParams = `login={"email":"${encodeURIComponent(strapiUserEmail)}","token":"${strapiJwt}"}`;

      const strapiRelatedUrls = {
        editLink: `${strapiSelectedValueUrl}${loginParams}`,
        createLink: `${strapiContentValuesUrl}${loginParams}`,
        mediaLink: `${strapiMediaUrl}${loginParams}`,
        mediaLibraryLink: `${strapiMediaLibraryUrl}${loginParams}`,
      };

      return strapiRelatedUrls;
    },
    [contentType, strapiJwt, strapiUserEmail, value]
  );

  const getModalUrl = useCallback(
    (strapiUrl: string = ''): string => {
      const { mediaLibraryLink, mediaLink, editLink, createLink } =
        getStrapiUrls(strapiUrl);
      if (contentType === 'mediaLibrary') {
        return mediaLibraryLink;
      }
      if (contentType === 'media') {
        return mediaLink;
      }
      if (value) {
        return editLink;
      }
      return createLink;
    },
    [contentType, value, getStrapiUrls]
  );

  useEffect(() => {
    const strapiUrl = getStrapiUrlFromWorkspace(organization);
    const newModalUrl = getModalUrl(strapiUrl);
    setModalUrl(newModalUrl);
  }, [getModalUrl, organization, value]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setLoadIframe(false);
    setKey((prevKey) => prevKey + 1);
    onReloadStrapiOptions?.();
  }, [onReloadStrapiOptions]);

  return (
    <div className='StrapiContentLink'>
      {buttonVariant === 'primary' && (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setLoadIframe(true);
          }}
        >
          {linkText}
        </Button>
      )}
      {buttonVariant === 'iconButton' && (
        <IconButton
          onClick={() => {
            setIsModalOpen(true);
            setLoadIframe(true);
          }}
        >
          <EditFileIcon />
        </IconButton>
      )}
      {loadIframe && (
        <Modal
          className='StrapiContentLink__modal'
          key={key}
          open={isModalOpen}
          onClose={handleCloseModal}
        >
          <div className='StrapiContentLink__iframeContainer'>
            <iframe
              src={modalUrl}
              name='strapi-content'
              title='Strapi iFrame'
              className='StrapiContentLink__iframe'
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
