import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

// Hilfsvariablen für die Pfad-Auflösung
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // WICHTIG: Die Base-URL sorgt dafür, dass Assets im Unterordner gefunden werden
  base: '/Minimalistmobileappui/', 
  
  plugins: [react()],
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Dein Alias für den src-Ordner
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    target: 'esnext',
    // Wir bleiben bei 'build', wie in deinem Workflow eingestellt
    outDir: 'build', 
    // Erzeugt eine saubere Struktur für GitHub Pages
    emptyOutDir: true,
  },
  
  server: {
    port: 3000,
    open: true,
  },
});
