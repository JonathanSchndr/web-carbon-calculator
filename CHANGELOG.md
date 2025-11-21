# Changelog

## 1.0.0 (2025-11-21)


### Features

* Add dynamic Open Graph image generation API and integrate it into meta tags for analysis results. ([aeb278a](https://github.com/JonathanSchndr/web-carbon-calculator/commit/aeb278a0a7db79b0abc86bef2a95555b5b182799))
* Implement core application UI with new components and composables, removing the OG image API and GitHub Pages deployment. ([7c56c05](https://github.com/JonathanSchndr/web-carbon-calculator/commit/7c56c054943bc46747fe380f3055601a6ffe12bd))
* Implement website analysis utility, integrate it into OG image generation with a custom font, and refactor the analyze API endpoint. ([fc1da1e](https://github.com/JonathanSchndr/web-carbon-calculator/commit/fc1da1e9b8e61d0b9d51d302cc832e01d472b296))
* Introduce main application page, enhance UI responsiveness, error messages, and update release workflow. ([b108511](https://github.com/JonathanSchndr/web-carbon-calculator/commit/b108511fcdd276332e86e8cd27167054da1a06fa))
* Load OG image font from `server/assets` via `useStorage` for Vercel deployment. ([b3573b3](https://github.com/JonathanSchndr/web-carbon-calculator/commit/b3573b3d7d5d27bcdc7504d078b3f920017bdc4a))
* Wrap InputForm in ClientOnly component with a skeleton fallback. ([f82c1e1](https://github.com/JonathanSchndr/web-carbon-calculator/commit/f82c1e195898f1d93793b8f82c1e7dc838375160))
