export type FeedbackMessage = {
  title: string;
  message: string;
};

export const NO_CONTROLS: FeedbackMessage = {
  title: 'No Controls Found',
  message:
    'Please ensure that your application is set up to use Controls and has been connected to the Gumband Cloud.',
} as const;

export const NO_SETTINGS: FeedbackMessage = {
  title: 'No Settings Found',
  message:
    'Please ensure that your application is set up to use Settings and has been connected to the Gumband Cloud.',
} as const;
