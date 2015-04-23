# Dungeons & Idlers

[![Build Status](https://travis-ci.org/kjirou/dungeons-and-idlers.svg?branch=master)](https://travis-ci.org/kjirou/dungeons-and-idlers)


## Development
### Dependency
- [direnv](https://github.com/zimbatm/direnv)
- [ImageMagick](http://www.imagemagick.org/) CLI tools (is used by [image-divider](https://github.com/kjirou/image-divider))

### Deployment
```bash
git clone git@github.com:kjirou/dungeons-and-idlers.git
cd ./dungeons-and-idlers
direnv allow
npm install
npm run build
npm run dev
open http://localhost:3000
```
