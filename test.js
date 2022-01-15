import {parse} from './parse.js'
import {stringify} from './stringify.js'
import {astToJs} from './astToJs.js'
import {unparse} from './unparse.js'
import {astToHtml} from './astToHtml.js'
import {astLikeJson} from './astLikeJson.js'
import {astToConfig} from './astToConfig.js'
import { astToXml } from './astToXml.js'
import { astToXml2 } from './astToXml2.js'

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

const decoded = parse(input)

const converted = astToJs(decoded)

const encoded = stringify(converted)

const stringified = unparse(decoded)

console.assert(JSON.stringify(decoded) === JSON.stringify(expectedDecoded), decoded)
console.assert(JSON.stringify(converted) === JSON.stringify(expectedConverted), converted)
console.assert(encoded === expectedEncoded, encoded)
console.assert(input === stringified, stringified)

console.assert(astToHtml(parse(`
[html][
  [head][
    [meta /]
  ]
  [body][
    [p title[explanation] disabled][
      [b][click] on this [a href[#]][link][br/]
    ]
  ]
]
`)) === `
<html>
  <head>
    <meta />
  </head>
  <body>
    <p title="explanation" disabled>
      <b>click</b> on this <a href="#">link</a><br/>
    </p>
  </body>
</html>
`)

console.assert(JSON.stringify(astLikeJson(parse(`
{
  Controls whether suggestions should automatically show up while typing.
  (editor.quickSuggestions)({
    (other)(true)
    (comments)(false)
    (strings)(false)
  })

  A string containing all characters to be considered word separators by the double click to select word feature.
  (terminal.integrated.wordSeparators)(" \\(\\)[]{}',"\`─‘’)

  Controls the maximum amount of lines the terminal keeps in its buffer.
  (terminal.integrated.scrollback)(1000)

  Override the kind of an extension. \`ui\` extensions are installed and run on the local machine while \`workspace\` extensions are run on the remote. By overriding an extension's default kind using this setting, you specify if that extension should be installed and enabled locally or remotely.
  (remote.extensionKind)({
    (pub.name)([("ui)])
  })

  Controls what type of git refs are listed when running \`Checkout to...\`.
   - local: Local branches
   - tags: Tags
   - remote: Remote branches
  (git.checkoutType)([("local)("remote)("tags)])

  The default location to clone a git repository.
  (git.defaultCloneDirectory)(null)
}
`, {open: '(', close: ')', escape: '\\'}))) === JSON.stringify(expectedConverted))

console.assert(JSON.stringify(astToConfig(parse(`
-editor.quickSuggestions
  Controls whether suggestions should automatically show up while typing.
[
  other [true]
  comments [false]
  strings [false]
]

-terminal.integrated.wordSeparators
  A string containing all characters to be considered word separators by the double click to select word feature.
[ ()\`[\`]{}',"\`\`─‘’]

terminal.integrated.scrollback 
  Controls the maximum amount of lines the terminal keeps in its buffer.
[1000]

remote.extensionKind 
  Override the kind of an extension. 'ui' extensions are installed and run on the local machine while 'workspace' extensions are run on the remote. By overriding an extension's default kind using this setting, you specify if that extension should be installed and enabled locally or remotely.
[
  pub.name [[ui]]
]

git.checkoutType 
  Controls what type of git refs are listed when running 'Checkout to...'.
    - local: Local branches
    - tags: Tags
    - remote: Remote branches
[[local] [remote] [tags]]

git.defaultCloneDirectory 
  The default location to clone a git repository.
[null]
`))) === `{"terminal.integrated.scrollback":1000,"remote.extensionKind":{"pub.name":["ui"]},"git.checkoutType":["local","remote","tags"],"git.defaultCloneDirectory":null}`)

console.assert(astToXml(parse(`
<html><
  <head><
    <meta />
  >
  <body><
    <p title<explanation> disabled><
      <b><click> on this <a href<#>><link><br/>
    >
  >
>
`, {open: '<', close: '>', escape: '&'})) === `
<html>
  <head>
    <meta />
  </head>
  <body>
    <p title="explanation" disabled>
      <b>click</b> on this <a href="#">link</a><br/>
    </p>
  </body>
</html>
`)

console.assert(astToXml2(parse(`
<html/
  <head/
    <meta >
  >
  <body/
    <p title<explanation> disabled/
      <b/click> on this <a href<#>/link><br>
    >
  >
>
`, {open: '<', close: '>', escape: '&'})) === `
<html>
  <head>
    <meta />
  </head>
  <body>
    <p title="explanation" disabled>
      <b>click</b> on this <a href="#">link</a><br/>
    </p>
  </body>
</html>
`)


console.log(astToXml2(parse(`
<html/
  <head/
    <meta>
  >
  <body/
    <p title<explanation> disabled/
      <b/click> on this <a href<#>/link><br>
    >
  >
>
`, {open: '<', close: '>', escape: '&'})))