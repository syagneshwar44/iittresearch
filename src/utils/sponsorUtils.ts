export const getSponsorImages = () => {
  const sponsorFiles = [
    '/assets/sponsors/MicrosoftResearch.png',
    '/assets/sponsors/google.png',
    '/assets/sponsors/adobe.png',
    '/assets/sponsors/serb.png',
    '/assets/sponsors/nvidia.png',
    '/assets/sponsors/waterloo.jpg',
    // Add any new sponsor images here
  ];

  return sponsorFiles.map(path => ({
    name: path.split('/').pop()?.split('.')[0] || '',
    image: path
  }));
}; 