SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "local:": "jspm_packages/local/",
    "app/": "src/"
  },
  meta: {
    "*.jsx": {
      "loader": "plugin-babel"
    },
    "*.css": {
      "loader": "plugin-css"
    },
    "*.scss": {
      "loader": "plugin-sass"
    }
  },
  separateCSS: true,
  trace: true,
  babelOptions: {
    "presets": [
      "babel-preset-react"
    ]
  },
  sassPluginOptions: {
    "copyAssets": true,
    "rewriteUrl": true,
    "autoprefixer": {
      "browsers": [
        "Chrome >= 35",
        "Firefox >= 38",
        "Edge >= 12",
        "Explorer >= 9",
        "iOS >= 8",
        "Safari >= 8",
        "Android 2.3",
        "Android >= 4",
        "Opera >= 12"
      ]
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "app": {
      "main": "index.dist.jsx",
      "defaultExtension": "jsx"
    }
  },
  browserConfig: {
    "babelOptions": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    },
    "packages": {
      "app": {
        "main": "index.jsx"
      }
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.15",
      "babel-preset-react": "npm:babel-preset-react@6.16.0",
      "plugin-css": "github:systemjs/plugin-css@0.1.32",
      "react-hot-loader": "npm:react-hot-loader@3.0.0-beta.6",
      "systemjs-hot-reloader-ex": "npm:systemjs-hot-reloader-ex@2.0.6",
      "plugin-sass": "github:mobilexag/plugin-sass@0.5.0"
    },
    "packages": {
      "npm:babel-plugin-transform-react-jsx-self@6.11.0": {
        "map": {
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:babel-plugin-transform-react-jsx-source@6.9.0": {
        "map": {
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:babel-plugin-transform-react-jsx@6.8.0": {
        "map": {
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-runtime": "npm:babel-runtime@6.18.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.18.0"
        }
      },
      "npm:babel-plugin-transform-react-display-name@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:react-proxy@3.0.0-alpha.1": {
        "map": {
          "lodash": "npm:lodash@4.16.6"
        }
      },
      "npm:global@4.3.1": {
        "map": {
          "process": "npm:process@0.5.2",
          "min-document": "npm:min-document@2.19.0",
          "node-min-document": "npm:min-document@2.19.0"
        }
      },
      "npm:min-document@2.19.0": {
        "map": {
          "dom-walk": "npm:dom-walk@0.1.1"
        }
      },
      "npm:error-stack-parser@1.3.6": {
        "map": {
          "stackframe": "npm:stackframe@0.3.1"
        }
      },
      "npm:invariant@2.2.1": {
        "map": {
          "loose-envify": "npm:loose-envify@1.3.0"
        }
      },
      "npm:babel-messages@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:debug@2.2.0": {
        "map": {
          "ms": "npm:ms@0.7.1"
        }
      },
      "npm:react-hot-loader@3.0.0-beta.6": {
        "map": {
          "react-deep-force-update": "npm:react-deep-force-update@2.0.1",
          "global": "npm:global@4.3.1",
          "react-proxy": "npm:react-proxy@3.0.0-alpha.1",
          "redbox-react": "npm:redbox-react@1.3.2",
          "babel-template": "npm:babel-template@6.16.0",
          "source-map": "npm:source-map@0.4.4"
        }
      },
      "npm:babel-preset-react@6.16.0": {
        "map": {
          "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
          "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.8.0",
          "babel-plugin-transform-react-jsx-source": "npm:babel-plugin-transform-react-jsx-source@6.9.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
          "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.8.0",
          "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.18.0",
          "babel-plugin-transform-react-jsx-self": "npm:babel-plugin-transform-react-jsx-self@6.11.0"
        }
      },
      "npm:redbox-react@1.3.2": {
        "map": {
          "error-stack-parser": "npm:error-stack-parser@1.3.6",
          "object-assign": "npm:object-assign@4.1.0"
        }
      },
      "npm:babel-template@6.16.0": {
        "map": {
          "babel-traverse": "npm:babel-traverse@6.18.0",
          "babel-types": "npm:babel-types@6.18.0",
          "lodash": "npm:lodash@4.16.6",
          "babylon": "npm:babylon@6.13.1",
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:babel-code-frame@6.16.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "chalk": "npm:chalk@1.1.3",
          "js-tokens": "npm:js-tokens@2.0.0"
        }
      },
      "npm:source-map@0.4.4": {
        "map": {
          "amdefine": "npm:amdefine@1.0.0"
        }
      },
      "npm:systemjs-hot-reloader-ex@2.0.6": {
        "map": {
          "core-js": "npm:core-js@2.4.1"
        }
      },
      "npm:babel-runtime@6.18.0": {
        "map": {
          "core-js": "npm:core-js@2.4.1",
          "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
        }
      },
      "npm:babel-traverse@6.18.0": {
        "map": {
          "babel-code-frame": "npm:babel-code-frame@6.16.0",
          "babel-messages": "npm:babel-messages@6.8.0",
          "babel-runtime": "npm:babel-runtime@6.18.0",
          "babylon": "npm:babylon@6.13.1",
          "debug": "npm:debug@2.2.0",
          "babel-types": "npm:babel-types@6.18.0",
          "globals": "npm:globals@9.12.0",
          "lodash": "npm:lodash@4.16.6",
          "invariant": "npm:invariant@2.2.1"
        }
      },
      "npm:babel-types@6.18.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.18.0",
          "lodash": "npm:lodash@4.16.6",
          "esutils": "npm:esutils@2.0.2",
          "to-fast-properties": "npm:to-fast-properties@1.0.2"
        }
      },
      "npm:babel-plugin-transform-flow-strip-types@6.18.0": {
        "map": {
          "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
          "babel-runtime": "npm:babel-runtime@6.18.0"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.18.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.18.0",
          "babel-types": "npm:babel-types@6.18.0",
          "lodash": "npm:lodash@4.16.6",
          "esutils": "npm:esutils@2.0.2"
        }
      },
      "npm:chalk@1.1.3": {
        "map": {
          "ansi-styles": "npm:ansi-styles@2.2.1",
          "strip-ansi": "npm:strip-ansi@3.0.1",
          "has-ansi": "npm:has-ansi@2.0.0",
          "supports-color": "npm:supports-color@2.0.0",
          "escape-string-regexp": "npm:escape-string-regexp@1.0.5"
        }
      },
      "npm:strip-ansi@3.0.1": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      },
      "npm:has-ansi@2.0.0": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      },
      "github:mobilexag/plugin-sass@0.5.0": {
        "map": {
          "postcss": "npm:postcss@5.2.5",
          "css-asset-copier": "npm:css-asset-copier@1.0.1",
          "sass.js": "npm:sass.js@0.9.13",
          "lodash": "npm:lodash@4.16.6",
          "autoprefixer": "npm:autoprefixer@6.5.1",
          "fs": "github:jspm/nodelibs-fs@0.1.2",
          "path": "github:jspm/nodelibs-path@0.1.0",
          "url": "github:jspm/nodelibs-url@0.1.0",
          "css-url-rewriter-ex": "npm:css-url-rewriter-ex@1.0.5",
          "reqwest": "github:ded/reqwest@2.0.5"
        }
      },
      "npm:postcss@5.2.5": {
        "map": {
          "supports-color": "npm:supports-color@3.1.2",
          "js-base64": "npm:js-base64@2.1.9",
          "chalk": "npm:chalk@1.1.3",
          "source-map": "npm:source-map@0.5.6"
        }
      },
      "npm:autoprefixer@6.5.1": {
        "map": {
          "postcss": "npm:postcss@5.2.5",
          "browserslist": "npm:browserslist@1.4.0",
          "caniuse-db": "npm:caniuse-db@1.0.30000572",
          "normalize-range": "npm:normalize-range@0.1.2",
          "num2fraction": "npm:num2fraction@1.2.2",
          "postcss-value-parser": "npm:postcss-value-parser@3.3.0"
        }
      },
      "npm:css-asset-copier@1.0.1": {
        "map": {
          "fs-extra": "npm:fs-extra@0.30.0",
          "core-js": "npm:core-js@2.4.1"
        }
      },
      "npm:supports-color@3.1.2": {
        "map": {
          "has-flag": "npm:has-flag@1.0.0"
        }
      },
      "npm:fs-extra@0.30.0": {
        "map": {
          "graceful-fs": "npm:graceful-fs@4.1.9",
          "jsonfile": "npm:jsonfile@2.4.0",
          "path-is-absolute": "npm:path-is-absolute@1.0.1",
          "klaw": "npm:klaw@1.3.1",
          "rimraf": "npm:rimraf@2.5.4"
        }
      },
      "npm:browserslist@1.4.0": {
        "map": {
          "caniuse-db": "npm:caniuse-db@1.0.30000572"
        }
      },
      "npm:css-url-rewriter-ex@1.0.5": {
        "map": {
          "core-js": "npm:core-js@2.4.1"
        }
      },
      "npm:rimraf@2.5.4": {
        "map": {
          "glob": "npm:glob@7.1.1"
        }
      },
      "npm:glob@7.1.1": {
        "map": {
          "path-is-absolute": "npm:path-is-absolute@1.0.1",
          "minimatch": "npm:minimatch@3.0.3",
          "inherits": "npm:inherits@2.0.3",
          "once": "npm:once@1.4.0",
          "inflight": "npm:inflight@1.0.6",
          "fs.realpath": "npm:fs.realpath@1.0.0"
        }
      },
      "npm:inflight@1.0.6": {
        "map": {
          "once": "npm:once@1.4.0",
          "wrappy": "npm:wrappy@1.0.2"
        }
      },
      "npm:minimatch@3.0.3": {
        "map": {
          "brace-expansion": "npm:brace-expansion@1.1.6"
        }
      },
      "npm:once@1.4.0": {
        "map": {
          "wrappy": "npm:wrappy@1.0.2"
        }
      },
      "npm:brace-expansion@1.1.6": {
        "map": {
          "concat-map": "npm:concat-map@0.0.1",
          "balanced-match": "npm:balanced-match@0.4.2"
        }
      },
      "github:jspm/nodelibs-url@0.1.0": {
        "map": {
          "url": "npm:url@0.10.3"
        }
      },
      "github:jspm/nodelibs-path@0.1.0": {
        "map": {
          "path-browserify": "npm:path-browserify@0.0.0"
        }
      },
      "npm:url@0.10.3": {
        "map": {
          "punycode": "npm:punycode@1.3.2",
          "querystring": "npm:querystring@0.2.0"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json",
    "local:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "bootstrap": "github:twbs/bootstrap@4.0.0-alpha.4",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "domain": "npm:jspm-nodelibs-domain@0.2.0",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "font-awesome": "npm:font-awesome@4.7.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "graceful-fs": "npm:graceful-fs@4.1.9",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.1",
    "module": "npm:jspm-nodelibs-module@0.2.0",
    "open-sans": "github:FontFaceKit/open-sans@1.4.2",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.1",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "react": "npm:react@15.3.2",
    "react-dom": "npm:react-dom@15.3.2",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "url": "npm:jspm-nodelibs-url@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.1",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.0"
  },
  packages: {
    "github:twbs/bootstrap@4.0.0-alpha.4": {
      "map": {
        "jquery": "npm:jquery@2.2.4",
        "tether": "github:HubSpot/tether@1.3.7"
      }
    },
    "github:FontFaceKit/open-sans@1.4.2": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.32"
      }
    },
    "npm:font-awesome@4.7.0": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.32"
      }
    },
    "npm:loose-envify@1.3.0": {
      "map": {
        "js-tokens": "npm:js-tokens@2.0.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.0": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.2.0",
        "ieee754": "npm:ieee754@1.1.8",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "randombytes": "npm:randombytes@2.0.3",
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "randombytes": "npm:randombytes@2.0.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@1.0.1",
        "cipher-base": "npm:cipher-base@1.0.3",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-des": "npm:browserify-des@1.0.0"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:readable-stream@2.1.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "hash.js": "npm:hash.js@1.0.3",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "asn1.js": "npm:asn1.js@4.8.1"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:asn1.js@4.8.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:react@15.3.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0",
        "object-assign": "npm:object-assign@4.1.0",
        "fbjs": "npm:fbjs@0.8.5"
      }
    },
    "npm:jspm-nodelibs-url@0.2.0": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:fbjs@0.8.5": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.0",
        "object-assign": "npm:object-assign@4.1.0",
        "promise": "npm:promise@7.1.1",
        "immutable": "npm:immutable@3.8.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@1.0.0",
        "node-fetch": "npm:node-fetch@1.6.3"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.5"
      }
    },
    "npm:node-fetch@1.6.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.0": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.0": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.1.5",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.4.1"
      }
    },
    "npm:stream-http@2.4.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.1.5",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "xtend": "npm:xtend@4.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    }
  }
});
