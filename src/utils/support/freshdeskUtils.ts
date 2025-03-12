const FRESHDESK_INITIALIZE_SCRIPT_ELEMENT_ID =
  'freshdesk-widget-initialize-script';
const FRESHDESK_SCRIPT_ELEMENT_ID = 'freshdesk-widget-script';

// Freshdesk does not supply types.  `any` will allow us to move on, but you will need to review the Freshdesk
// documentation to ensure proper usage: https://developers.freshdesk.com/widget-api/
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FreshworksWidget: any;
  }
}

// Each of these script includes should only be added once, hence the reason we check for an existing id first
export const initializeFreshdesk = (): void => {
  if (!document.getElementById(FRESHDESK_INITIALIZE_SCRIPT_ELEMENT_ID)) {
    const script = document.createElement('script');
    script.id = FRESHDESK_INITIALIZE_SCRIPT_ELEMENT_ID;
    script.text =
      'window.fwSettings={\n\'widget_id\':47000006145\n};!function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()';
    document.body.appendChild(script);
  }
  if (!document.getElementById(FRESHDESK_SCRIPT_ELEMENT_ID)) {
    const script = document.createElement('script');
    script.id = FRESHDESK_SCRIPT_ELEMENT_ID;
    script.type = 'text/javascript';
    script.src = 'https://widget.freshworks.com/widgets/47000006145.js';
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);
  }
  window.FreshworksWidget('hide', 'launcher');
};

interface FreshdeskPrefill {
  name?: string;
  email?: string;
  description?: string;
  subject?: string;
}
export const openFreshdeskWidget = ({
  name,
  email,
  description,
  subject,
}: FreshdeskPrefill): void => {
  if (!window.FreshworksWidget) {
    // eslint-disable-next-line no-console
    console.warn('Freshworks has not been registered');
  } else {
    window.FreshworksWidget('identify', 'ticketForm', {
      name,
      email,
      description,
      subject,
    });
    window.FreshworksWidget('open');
  }
};
