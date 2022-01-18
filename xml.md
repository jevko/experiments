# Compact XML with Jevko

## astToXml

```
<html><
  <head><
    <meta />
  >
  <body><
    <p title<explanation> disabled><
      <b><click> on this <a href<#>><link><br/>
    >
  >
```

## astToXml2

```
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
```

## astToXml3

XML subset with no attributes

```
svg[width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink]
rect[fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]]
g[opacity[0.8]
	rect[x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]]
	circle[cx[125] cy[125] r[75] fill[orange]]
	polyline[points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]]
	line[x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]]
]
]
```

## astToXml4

like astToXml3, but supports attributes which are separated from content by `/`

```
svg[width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink]/
rect[fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]]
g[opacity[0.8]/
	rect[x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]]
	circle[cx[125] cy[125] r[75] fill[orange]]
	polyline[points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]]
	line[x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]]
]
]
```

## astToXml5

attributes are marked with `=`

elements with empty tags resolve to text nodes

```
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
```

## astToXml6

like astToXml5, but attributes are of the form `tag [[attributes] children]`, i.e. they come as the first child with empty tag. This means that to have a tag with no attributes and a text node as the first child one must write `tag [[][text]]`

```
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
```

## astToXml7

Like astToXml6, except attributes come immediately after the tag, separated by a space. Out of all of the above this encoding is the most compact for data interchange.

```
svg width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink][
  rect fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390][]
  g opacity[0.8][
    rect x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink][]
    circle cx[125] cy[125] r[75] fill[orange][]
    polyline points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none][]
    line x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4][]
  ]
]
```

## astToXml8

Like astToXml7, except that a tag without content may omit empty brackets if it is followed by a tag with attributes.

```
svg width[391] height[391] viewBox[-70.5 -70.5 391 391] xmlns[http://www.w3.org/2000/svg] xmlns:xlink[http://www.w3.org/1999/xlink][
  rect fill[#fff] stroke[#000] x[-70] y[-70] width[390] height[390]
  g opacity[0.8][
    rect x[25] y[25] width[200] height[200] fill[lime] stroke-width[4] stroke[pink]
    circle cx[125] cy[125] r[75] fill[orange]
    polyline points[50,150 50,200 200,200 200,100] stroke[red] stroke-width[4] fill[none]
    line x1[50] y1[50] x2[200] y2[200] stroke[blue] stroke-width[4]
  ]
]
```

In this encoding shorthand attributes without values must be placed immediately after the tag, and if they any are specified, they must be followed by a non-shorthand attribute i.e.:

```
elem attr attr2 attr3[][content]
```