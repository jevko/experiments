# smalltree

A collection of functions/chunks of code showcasing some of the things that can be done with [Jevko](https://jevko.org).

## parse

`parse` is a parser for the following ABNF grammar:

```fs
Value = Subvalues Suffix
Subvalue = Prefix "[" Value "]"

Subvalues = *Subvalue
Suffix = *Char
Prefix = *Char

Char = Escape / %x0-5a / %x5c / %x5e-5f / %x61-10ffff
Escape = "`" ("`" / "[" / "]")
```

which matches the same strings as the minimal [Jevko](https://jevko.org) grammar:

```fs
Jevko   = *(open Jevko close / data)
open    = "["
close   = "]"
data    = 1*(escape / char)
escape  = "`" ("[" / "]" / "`")
```

albeit unambigiously. Also the resulting syntax tree has a more defined structure which is useful for certain kinds of transformations.

The shape of the tree fairly closely matches the grammar, e.g.:

```json
{
  "subvalues": [
    {
      "prefix": "key ",
      "value": {
        "subvalues": [],
        "suffix": "value"
      }
    }
  ],
  "suffix": ""
}
```

is the syntax tree of the string:

```
key [value]
```

**Trees produced by parse are lossless**, i.e. they contain enough information to recreate the input *exactly*.

<!-- The top level of the tree includes characters for `open`, `close`, and `escape` -->

## unparse

Which brings us to `unparse` -- it performs the inverse operation, i.e. converts a syntax tree returned by `parse` back to a string. Because the tree allows recreating the input exactly, the composition of `parse` and `unparse` is equivalent to identity. In other words this composition is indempotent for conforming inputs.

## stringify

`stringify` translates a JavaScript value into a Jevko string.

## astToJs

`astToJs` converts a syntax tree returned by `parse` to a JavaScript value.

## astToConfig

`astToConfig` is similar to `astToJs`, except it supports disabling keys in objects and minimalist comments. Keys are restricted to one-line strings.

This is a good start for a minimalist configuration format. For example the following string:

```
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
```

is converted to:

```json
{
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
```

Note that the values under keys `editor.quickSuggestions` and `terminal.integrated.wordSeparators` don't appear in the output, because these keys were disabled (effectively commented out) by preceding them with `-`. 

If a subvalue's prefix is mutliline, only the first line is interpreted as key. The remaining lines are ignored, serving as the minimalist comments.

## astToHtml

`astToHtml` converts a parse tree returned by `parse` into HTML/XML string, effectively translating a compact Jevko-based encoding of XML to XML itself. For example the following Jevko string:

```
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
```

can be translated to the following XML string:

```html
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
```

## astLikeJson

`astLikeJson` converts a JSON-compatible Jevko-based format to JSON (more precisely a JavaScript value which can be converted to JSON without loss of information, except whitespace).

For example the following string:

```
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
```

is converted to the following JSON:

```
{
  "editor.quickSuggestions": { other: true, comments: false, strings: false },
  "terminal.integrated.wordSeparators": " ()[]{}',\"`─‘’",
  "terminal.integrated.scrollback": 1000,
  "remote.extensionKind": { "pub.name": [ "ui" ] },
  "git.checkoutType": [ "local", "remote", "tags" ],
  "git.defaultCloneDirectory": null
}
```

Note: this format uses round brackets and the backslash `()\` instead of square brackets and the grave accent `` []` ``, as in cannonical Jevko.

