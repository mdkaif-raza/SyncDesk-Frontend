import Images from '../../assets/images';

/**
 * Onboarding Slide Data
 * Matches the SyncDesk 3-screen reference design mockup.
 */
export const onboardingSlides = [
  {
    id: '1',
    title: 'Bring your team\ntogether.',
    subtitle: 'Connect your company, conversations, and work in one place.',
    image: Images.onboardingTeam,
    primaryButtonText: 'Next',
    secondaryButtonText: 'Skip',
  },
  {
    id: '2',
    title: 'Create or join\na workspace.',
    subtitle: 'Set up your company space or join your team with an invite code.',
    image: Images.onboardingWorkspace,
    primaryButtonText: 'Next',
    secondaryButtonText: 'Back',
  },
  {
    id: '3',
    title: 'Stay in sync.',
    subtitle: 'Chat in channels, manage tasks, and keep every project moving.',
    image: Images.onboardingSync,
    primaryButtonText: 'Get started',
    secondaryButtonText: 'Back',
  },
];

export default onboardingSlides;
