import {astToLengthPrefixed} from './astToLengthPrefixed.js'
import { astToLengthPrefixed2 } from './astToLengthPrefixed2.js'
import { parseLengthPrefixed2 } from './parseLengthPrefixed2.js'
import { astToLengthPrefixed3 } from './astToLengthPrefixed3.js'
import { parseLengthPrefixed3 } from './parseLengthPrefixed3.js'
import { parseLengthPrefixed4 } from './parseLengthPrefixed4.js'
import { astToLengthPrefixed4 } from './astToLengthPrefixed4.js'
import { parse } from "./parse"

console.log(astToLengthPrefixed(parse(`editor.quickSuggestions [
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
git.defaultCloneDirectory [null]`)))

console.log(astToLengthPrefixed2(parse(`editor.quickSuggestions [
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
git.defaultCloneDirectory [null]`)))

console.log(parseLengthPrefixed2(`24:editor.quickSuggestions [9:
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
git.defaultCloneDirectory [4:null]0:`))

console.log(astToLengthPrefixed3(parse(`editor.quickSuggestions [
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
git.defaultCloneDirectory [null]`)))

console.log(parseLengthPrefixed3(`24[editor.quickSuggestions 9[
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
git.defaultCloneDirectory 4]null]`))

console.log(astToLengthPrefixed4(parse(`editor.quickSuggestions [
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
git.defaultCloneDirectory [null]`)))

console.log(parseLengthPrefixed4(`o[editor.quickSuggestions 9[
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
git.defaultCloneDirectory 4]null]`))
