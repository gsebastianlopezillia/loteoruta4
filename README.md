
  # Landing Page Loteo Ruta 4

  This is a code bundle for Landing Page Loteo Ruta 4. The original project is available at https://www.figma.com/design/GqQbNqPq9t5yRQKcHHgmTJ/Landing-Page-Loteo-Ruta-4.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deploy to GitHub Pages

  1. Build the project:
     ```bash
     npm run build
     ```

  2. Deploy to GitHub Pages:
     ```bash
     npm run deploy
     ```

  This will build the project and deploy it to the `gh-pages` branch of your repository.

  ### Manual Deploy Steps:
  1. Build the project: `npm run build`
  2. Copy `.nojekyll` to the build directory: `cp .nojekyll build/`
  3. Commit and push the `build` folder to your `gh-pages` branch or upload it manually to GitHub Pages

  ### GitHub Pages Configuration:
  - Go to your repository Settings > Pages
  - Set Source to "Deploy from a branch"
  - Select `gh-pages` branch and `/ (root)` folder
  - Save and wait for deployment
  