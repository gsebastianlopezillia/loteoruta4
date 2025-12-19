# Guía para Probar el Build Antes de Deploy

## Pasos para verificar que todo funciona:

### 1. Build local y verificación
```bash
npm run build:verify
```

Este comando:
- Hace el build
- Verifica que todos los archivos necesarios estén presentes
- Muestra el contenido del directorio build

### 2. Probar el build localmente
```bash
npm run build
npm run preview
```

Esto iniciará un servidor local en `http://localhost:4173` donde puedes probar el sitio antes de hacer deploy.

### 3. Verificar manualmente los archivos
Después del build, verifica que existan estos archivos en `build/`:
- ✅ `index.html`
- ✅ `manifest.json`
- ✅ `favicon.svg`
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `.nojekyll` (se copia en GitHub Actions)

### 4. Verificar que el sitio funciona
1. Abre `build/index.html` en el navegador
2. Abre la consola del navegador (F12)
3. Verifica que NO haya errores 404 para:
   - `/manifest.json`
   - `/favicon.svg`
   - Los archivos JavaScript

### 5. Si todo está bien, hacer commit y push
```bash
git add .
git commit -m "Fix: Asegurar que archivos públicos se copien correctamente"
git push origin main
```

El workflow de GitHub Actions automáticamente:
1. Hará el build
2. Copiará `.nojekyll` al build
3. Copiará los archivos de `public/` (por si acaso)
4. Verificará que todo esté presente
5. Hará el deploy

## Notas importantes:

- **Vite automáticamente copia** los archivos de `public/` al build cuando `copyPublicDir: true` está configurado (ya está configurado)
- El workflow de GitHub Actions **también copia** los archivos de `public/` como respaldo
- El archivo `.nojekyll` es **crítico** para que GitHub Pages sirva los archivos con los tipos MIME correctos
- Si ves errores 404 después del deploy, revisa los logs del workflow en GitHub Actions
