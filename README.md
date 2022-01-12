# smalltree

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

## AST to HTML

`astToHtml` converts a parse tree returned by `parse` into HTML/XML, effectively translating a compact Jevko-based encoding of XML to XML itself. For example the following Jevko string:

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