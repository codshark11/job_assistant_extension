# Job Assistant Chrome Extension

## Development

```bash
# clone the repo
git clone https://github.com/codshark11/job_assistant_extension.git && cd job_assistant_extension

# install needed package
yarn
# add logo under /public/manifest.json
# for local test
yarn start
# then open localhost:1234

# build the extension
yarn build

# develop the extension
yarn dev
```

![2022-09-11_22-38](https://user-images.githubusercontent.com/17363908/189584329-04ed1cce-ec1e-4da8-8c06-4365385b87f2.png)

## Installation

- After build process, open Chrome or any chromium based browser
- Go to manage extension page
- Toggle `Developer mode`
- Choose Load unpacked option for `/publish` folder or unzip latest [release](https://github.com/vincecao/react-chrome-extension-template-side-panel/releases) file.
