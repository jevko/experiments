import {parse} from './parse.js'
import { astToXml } from './astToXml.js'
import { astToXml2 } from './astToXml2.js'
import { astToXml3 } from './astToXml3.js'
import { astToXml4 } from './astToXml4.js'
import { astToXml5 } from './astToXml5.js'
import { astToXml6 } from './astToXml6.js'
import { astToXml6a } from './astToXml6a.js'
import { astToXml7 } from './astToXml7.js'



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
[html/
  [head/
    [meta]
  ]
  [body/
    [p title[explanation] disabled/
      [b/click] on this [a href[#]/link][br]
    ]
  ]
]
`)) === `
<html>
  <head>
    <meta/>
  </head>
  <body>
    <p title="explanation" disabled>
      <b>click</b> on this <a href="#">link</a><br/>
    </p>
  </body>
</html>
`)

console.log(astToXml2(parse(`
[?xml version[1.0] encoding[UTF-8]]
[book xml:id[simple_book] xmlns[http://docbook.org/ns/docbook] version[5.0]/
  [title/Very simple book]
  [chapter xml:id[chapter_1]/
    [title/Chapter 1]
    [para/Hello world!]
    [para/I hope that your day is proceeding [emphasis/splendidly]!]
  ]
  [chapter xml:id[chapter_2]/
    [title/Chapter 2]
    [para/Hello again, world!]
  ]
]
`)))

console.log(astToXml2(parse(`
[?xml version[1.0] encoding[UTF-8] standalone[no]]
[!DOCTYPE svg PUBLIC [-//W3C//DTD SVG 1.1//EN] [http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd]]
[svg width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink]/
[rect fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]]
[g opacity[0.8]/
	[rect x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]]
	[circle cx[125] cy[125] r[75] fill[orange]]
	[polyline points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]]
	[line x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]]
]
]
`)))

console.log(astToXml3(parse(`
?xml[version[1.0] encoding[UTF-8] standalone[no]]
!DOCTYPE[svg PUBLIC [-//W3C//DTD SVG 1.1//EN] [http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd]]
svg[width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink]
rect[fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]]
g[opacity[0.8]
	rect[x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]]
	circle[cx[125] cy[125] r[75] fill[orange]]
	polyline[points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]]
	line[x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]]
]
]
`)))

console.log(astToXml4(parse(`
?xml[version[1.0] encoding[UTF-8] standalone[no]]
!DOCTYPE[svg PUBLIC [-//W3C//DTD SVG 1.1//EN] [http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd]]
svg[width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink]/
rect[fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]]
g[opacity[0.8]/
	rect[x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]]
	circle[cx[125] cy[125] r[75] fill[orange]]
	polyline[points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]]
	line[x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]]
]
]
`)))

console.log(astToXml5(parse(`
phyloxml[xmlns:xsi=[http://www.w3.org/2001/XMLSchema-instance] xmlns=[http://www.phyloxml.org] xsi:schemaLocation=[http://www.phyloxml.org http://www.phyloxml.org/1.10/phyloxml.xsd]
  phylogeny[rooted=[true]
    name[Alcohol dehydrogenases]
    description[contains examples of commonly used elements]
    clade[
      events[
        speciations[1]
      ]
      clade[
        taxonomy[
          id[provider=[ncbi]6645]
          scientific_name[Octopus vulgaris]
        ]
        sequence[
          accession[source=[UniProtKB]P81431]
          name[Alcohol dehydrogenase class-3]
        ]
      ]
      clade[
        confidence[type=[bootstrap]100]
        events[
          speciations[1]
        ]
        clade[
          taxonomy[
            id[provider=[ncbi]1423]
            scientific_name[Bacillus subtilis]
          ]
          sequence[
            accession[source=[UniProtKB]P71017]
            name[Alcohol dehydrogenase]
          ]
        ]
        clade[
          taxonomy[
            id[provider=[ncbi]562]
            scientific_name[Escherichia coli]
          ]
          sequence[
            accession[source=[UniProtKB]Q46856]
            name[Alcohol dehydrogenase]
          ]
        ]
      ]
    ]
  ]
]
`)))

console.log(astToXml6(parse(`
phyloxml[[xmlns:xsi[http://www.w3.org/2001/XMLSchema-instance] xmlns[http://www.phyloxml.org] xsi:schemaLocation[http://www.phyloxml.org http://www.phyloxml.org/1.10/phyloxml.xsd]]
  phylogeny[[rooted[true]]
    name[Alcohol dehydrogenases]
    description[contains examples of commonly used elements]
    clade[
      events[
        speciations[1]
      ]
      clade[
        taxonomy[
          id[[provider[ncbi]]6645]
          scientific_name[Octopus vulgaris]
        ]
        sequence[
          accession[[source[UniProtKB]]P81431]
          name[Alcohol dehydrogenase class-3]
        ]
      ]
      clade[
        confidence[[type[bootstrap]]100]
        events[
          speciations[1]
        ]
        clade[
          taxonomy[
            id[[provider[ncbi]]1423]
            scientific_name[Bacillus subtilis]
          ]
          sequence[
            accession[[source[UniProtKB]]P71017]
            name[Alcohol dehydrogenase]
          ]
        ]
        clade[
          taxonomy[
            id[[provider[ncbi]]562]
            scientific_name[Escherichia coli]
          ]
          sequence[
            accession[[source[UniProtKB]]Q46856]
            name[Alcohol dehydrogenase]
          ]
        ]
      ]
    ]
  ]
]
`)))



console.log(astToXml7(parse(`
svg width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink][
  rect fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390][]
  g opacity[0.8][
    rect x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink][]
    circle cx[125] cy[125] r[75] fill[orange][]
    polyline points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none][]
    line x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4][]
  ]
]
`)))