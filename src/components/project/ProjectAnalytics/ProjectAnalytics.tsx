import { type FunctionComponent } from 'react';
import { Project, ProjectSettings } from '../../../app/services/workspace';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel/CloudConnectErrorMessagePanel';
import './ProjectAnalytics.css';

// TODO: remove this file once the new TikTok analytics charts are complete
export interface ProjectAnalyticsProps {
  project: Project;
}

const isURLValid = (url: string): boolean => {
  return url.startsWith('https://datastudio.google.com');
};

const getAdobeSiteSetting = (site: Project) => {
  if (site.sitesettings.length < 1) {
    return null;
  }
  return site.sitesettings.find(
    (setting: ProjectSettings) =>
      setting.idString === '$external-analytics-datastudio-url'
  );
};

export const ProjectAnalytics: FunctionComponent<ProjectAnalyticsProps> = ({
  project,
}) => {
  const adobeSiteSetting = getAdobeSiteSetting(project);
  return (
    <>
      {(!adobeSiteSetting || !isURLValid(adobeSiteSetting.value)) && (
        <CloudConnectErrorMessagePanel title='Unable To Load Analytics' />
      )}
      {!!adobeSiteSetting && isURLValid(adobeSiteSetting.value) && (
        <div className='siteReportExternalReportDiv'>
          <iframe
            className='siteReportExternalReportIframe'
            src={adobeSiteSetting.value}
            frameBorder='0'
            title='Looker Studio'
          />
        </div>
      )}
    </>
  );
};
