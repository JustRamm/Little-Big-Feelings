import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['assets/**/*.svg', 'assets/**/*.png', 'assets/**/*.mpeg', 'vendor/*.js', 'favicon.svg'],
            manifest: {
                name: 'Little Big Feelings',
                short_name: 'Feelings',
                description: 'Explore Your Wonderful Emotions Offline!',
                theme_color: '#FF80AB',
                background_color: '#FFF9E6',
                display: 'standalone',
                orientation: 'landscape',
                icons: [
                    {
                        src: 'assets/brand/nextlogo.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml'
                    },
                    {
                        src: 'assets/brand/nextlogo.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml'
                    }
                ]
            },
            workbox: {
                // Cache Google Fonts
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'google-fonts-cache',
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                      },
                      cacheableResponse: {
                        statuses: [0, 200]
                      }
                    }
                  },
                  {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'gstatic-fonts-cache',
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                      },
                      cacheableResponse: {
                        statuses: [0, 200]
                      }
                    }
                  }
                ]
            }
        })
    ]
});
