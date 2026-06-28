import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mnj.ion',
  appName: 'Ion',
  webDir: 'dist',
  server: {
    cleartext: true,
  },
};

export default config;
