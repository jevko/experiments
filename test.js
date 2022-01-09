import {decode} from './decode.js'
import {encode} from './encode.js'
import {astToJs} from './astToJs.js'
import {astToString} from './astToString.js'

const input = `
editor.quickSuggestions [
  other [true]
  comments [false]
  strings [false]
]
terminal.integrated.wordSeparators [ ()\`[\`]{}',"\`\`─‘’]
terminal.integrated.scrollback [1000]
remote.extensionKind [
  pub.name [[ui]]
]
git.checkoutType [[local] [remote] [tags]]
git.defaultCloneDirectory [null]
`

const expectedDecoded = {
  "subvalues": [
    {
      "prefix": "\neditor.quickSuggestions ",
      "value": {
        "subvalues": [
          {
            "prefix": "\n  other ",
            "value": {
              "subvalues": [],
              "suffix": "true"
            }
          },
          {
            "prefix": "\n  comments ",
            "value": {
              "subvalues": [],
              "suffix": "false"
            }
          },
          {
            "prefix": "\n  strings ",
            "value": {
              "subvalues": [],
              "suffix": "false"
            }
          }
        ],
        "suffix": "\n"
      }
    },
    {
      "prefix": "\nterminal.integrated.wordSeparators ",
      "value": {
        "subvalues": [],
        "suffix": " ()[]{}',\"`─‘’"
      }
    },
    {
      "prefix": "\nterminal.integrated.scrollback ",
      "value": {
        "subvalues": [],
        "suffix": "1000"
      }
    },
    {
      "prefix": "\nremote.extensionKind ",
      "value": {
        "subvalues": [
          {
            "prefix": "\n  pub.name ",
            "value": {
              "subvalues": [
                {
                  "prefix": "",
                  "value": {
                    "subvalues": [],
                    "suffix": "ui"
                  }
                }
              ],
              "suffix": ""
            }
          }
        ],
        "suffix": "\n"
      }
    },
    {
      "prefix": "\ngit.checkoutType ",
      "value": {
        "subvalues": [
          {
            "prefix": "",
            "value": {
              "subvalues": [],
              "suffix": "local"
            }
          },
          {
            "prefix": " ",
            "value": {
              "subvalues": [],
              "suffix": "remote"
            }
          },
          {
            "prefix": " ",
            "value": {
              "subvalues": [],
              "suffix": "tags"
            }
          }
        ],
        "suffix": ""
      }
    },
    {
      "prefix": "\ngit.defaultCloneDirectory ",
      "value": {
        "subvalues": [],
        "suffix": "null"
      }
    }
  ],
  "suffix": "\n",
  "open": "[",
  "close": "]",
  "escape": "`"
}

const expectedConverted = {
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
  },
  "terminal.integrated.wordSeparators": " ()[]{}',\"`─‘’",
  "terminal.integrated.scrollback": 1000,
  "remote.extensionKind": {
    "pub.name": [
      "ui"
    ]
  },
  "git.checkoutType": [
    "local",
    "remote",
    "tags"
  ],
  "git.defaultCloneDirectory": null
}

const expectedEncoded = `editor.quickSuggestions[other[true]comments[false]strings[false]]terminal.integrated.wordSeparators[ ()\`[\`]{}',"\`\`─‘’]terminal.integrated.scrollback[1000]remote.extensionKind[pub.name[[ui]]]git.checkoutType[[local][remote][tags]]git.defaultCloneDirectory[null]`

const decoded = decode(input)

const converted = astToJs(decoded)

const encoded = encode(converted)

const stringified = astToString(decoded)

console.assert(JSON.stringify(decoded) === JSON.stringify(expectedDecoded), decoded)
console.assert(JSON.stringify(converted) === JSON.stringify(expectedConverted), converted)
console.assert(encoded === expectedEncoded, encoded)
console.assert(input === stringified, stringified)

// console.log(decoded)
// console.log(converted)
// console.log(encoded)