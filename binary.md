# Binary Jevko formats

## astToLengthPrefixed

Converts a parse tree returned by `parse` to a length-prefixed version of Jevko.

For example this:

```
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
```

becomes this:

```
6:24:editor.quickSuggestions 3:9:
  other 0:4:true12:
  comments 0:5:false11:
  strings 0:5:false1:
36:
terminal.integrated.wordSeparators 0:20: ()[]{}',"`─‘’32:
terminal.integrated.scrollback 0:4:100022:
remote.extensionKind 1:12:
  pub.name 1:0:0:2:ui0:1:
18:
git.checkoutType 3:0:0:5:local1: 0:6:remote1: 0:4:tags0:27:
git.defaultCloneDirectory 0:4:null0:
```

The length-prefixed form requires no escaping and is easy to convert to a binary form.

## astToLengthPrefixed2

Like `astToLengthPrefixed`, except the result is:

```
24:editor.quickSuggestions [9:
  other [4:true]12:
  comments [5:false]11:
  strings [5:false]1:
]36:
terminal.integrated.wordSeparators [20: ()[]{}',"\`─‘’]32:
terminal.integrated.scrollback [4:1000]22:
remote.extensionKind [12:
  pub.name [0:[2:ui]0:]1:
]18:
git.checkoutType [0:[5:local]1: [6:remote]1: [4:tags]0:]27:
git.defaultCloneDirectory [4:null]0:
```

The difference is that this format preserves the brackets `[]` instead of dropping them in favor of prefixing nodes with the count of their children. This is more space-efficient and easier to parse.

## astToLengthPrefixed3

Like `astToLengthPrefixed2`, except the result is:

```
24[editor.quickSuggestions 9[
  other 4]true12[
  comments 5]false11[
  strings 5]false1]
36[
terminal.integrated.wordSeparators 20] ()[]{}',"\`─‘’32[
terminal.integrated.scrollback 4]100022[
remote.extensionKind 12[
  pub.name [2]ui]1]
18[
git.checkoutType [5]local1[ 6]remote1[ 4]tags]27[
git.defaultCloneDirectory 4]null]
```

This format moves the brackets `[]` next to the length-prefixes, dropping colons `:` and saving space.

## astToLengthPrefixed4

Like `astToLengthPrefixed3`, except the result is:

```
o[editor.quickSuggestions 9[
  other 4]truec[
  comments 5]falseb[
  strings 5]false1]
10[
terminal.integrated.wordSeparators k] ()[]{}',"\`─‘’w[
terminal.integrated.scrollback 4]1000m[
remote.extensionKind c[
  pub.name [2]ui]1]
i[
git.checkoutType [5]local1[ 6]remote1[ 4]tags]r[
git.defaultCloneDirectory 4]null]
```

In this format the lengths are encoded as [base36](https://en.wikipedia.org/wiki/Base36) numbers, making the format a tiny bit more space-efficient.