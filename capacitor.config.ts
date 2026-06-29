import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mnj.ion',
  appName: 'Ion',
  webDir: 'dist',
  server: {
    url: 'https://ion-8dwz-3y2tam4yt-mnj-s-projects.vercel.app',
    cleartext: true,
  },
};

export default config;
