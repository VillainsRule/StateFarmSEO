import * as vite from 'vite';
import react from '@vitejs/plugin-react';

export default vite.defineConfig({
    plugins: [react()],

    server: {
        port: 6767,
        mimeTypes: {
            '.module.css': 'text/css'
        }
    },

    css: {
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: '[hash:8]'
        }
    },

    build: {
        target: 'es2022',
        outDir: './dist',
        rollupOptions: {
            output: {
                entryFileNames: 'seo.build.js',
                assetFileNames: 'seo.build.[ext]'
            }
        }
    }
});
