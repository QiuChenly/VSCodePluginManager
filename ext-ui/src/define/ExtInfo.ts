interface ExtensionLocation {
  $mid: number;
  fsPath: string;
  path: string;
  scheme: string;
}

interface ExtensionGalleryBanner {
  color: string;
  theme: string;
}

interface ExtensionBugs {
  url: string;
  email: string;
}

interface ExtensionRepository {
  type: string;
  url: string;
}

export interface Extension {
  id: string; // '1YiB.nodejs-bundle'
  identifier: {
    value: string; // '1YiB.nodejs-bundle'
    _lower: string; // '1yib.nodejs-bundle'
  };
  isBuiltin: boolean; // false
  isUserBuiltin: boolean; // false
  isUnderDevelopment: boolean; // false
  extensionLocation: ExtensionLocation;
  uuid: string; // 'da90b4d7-020b-4419-b05e-14e937576a56'
  targetPlatform: string | undefined; // 'undefined'
  publisherDisplayName: string; // '1YiB'
  preRelease: boolean; // false
  name: string; // 'nodejs-bundle'
  displayName: string; // 'nodejs'
  version: string; // '1.0.0'
  publisher: string; // '1YiB'
  description: string; // 'extensions for nodejs'
  categories: string[]; // ['Extension Packs']
  icon: string; // 'assets/icon.png'
  galleryBanner: ExtensionGalleryBanner;
  engines: {
    vscode: string; // '^1.74.0'
  };
  extensionPack: string[]; // ['standard.vscode-standard', 'rvest.vs-code-prettier-eslint', 'yatki.vscode-surround', 'jock.svg', '1YiB.svelte-bundle']
  license: string; // 'LICENSE'
  markdown: string; // 'github'
  bugs: ExtensionBugs;
  repository: ExtensionRepository;
  logoUri: any;
  homepage: string; // 'https://github.com/1YiB/vsc-bundle/tree/main/nodejs'
}

const extensionData: Extension = {
  id: "1YiB.nodejs-bundle",
  identifier: {
    value: "1YiB.nodejs-bundle",
    _lower: "1yib.nodejs-bundle",
  },
  isBuiltin: false,
  isUserBuiltin: false,
  isUnderDevelopment: false,
  extensionLocation: {
    $mid: 1,
    fsPath: "/Users/qiuchenly/.vscode/extensions/1yib.nodejs-bundle-1.0.0",
    path: "/Users/qiuchenly/.vscode/extensions/1yib.nodejs-bundle-1.0.0",
    scheme: "file",
  },
  uuid: "da90b4d7-020b-4419-b05e-14e937576a56",
  targetPlatform: undefined,
  publisherDisplayName: "1YiB",
  preRelease: false,
  name: "nodejs-bundle",
  displayName: "nodejs",
  version: "1.0.0",
  publisher: "1YiB",
  description: "extensions for nodejs",
  categories: ["Extension Packs"],
  icon: "assets/icon.png",
  galleryBanner: {
    color: "#339933",
    theme: "dark",
  },
  engines: {
    vscode: "^1.74.0",
  },
  extensionPack: [
    "standard.vscode-standard",
    "rvest.vs-code-prettier-eslint",
    "yatki.vscode-surround",
    "jock.svg",
    "1YiB.svelte-bundle",
  ],
  license: "LICENSE",
  markdown: "github",
  bugs: {
    url: "https://github.com/1YiB/vsc-bundle/issues",
    email: "1YiB@proton.me",
  },
  logoUri: {},
  repository: {
    type: "git",
    url: "https://github.com/1YiB/vsc-bundle",
  },
  homepage: "https://github.com/1YiB/vsc-bundle/tree/main/nodejs",
};
