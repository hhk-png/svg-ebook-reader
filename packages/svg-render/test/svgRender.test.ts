import { describe, expect, it } from 'vitest'
import { ContentType } from '@svg-ebook-reader/shared'
import { SvgRender } from '../src/svgRender'
// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'

// @ts-ignore
globalThis.__BROWSER__ = false

describe('svgRender', () => {
  const renderer = new SvgRender({
    padding: '10',
  })
  it('options.padding', () => {
    const {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    } = renderer.options
    expect(paddingTop).toBe(10)
    expect(paddingRight).toBe(10)
    expect(paddingBottom).toBe(10)
    expect(paddingLeft).toBe(10)
  })

  it('generateRect', () => {
    const { width, height, backgroundColor } = renderer.options
    expect(renderer.background).toBe(
      `<rect width="${width}" height="${height}"`
      + ` fill="${backgroundColor}" pointer-events="none"/>`,
    )
  })

  it('genarateSvg', () => {
    const { width, height, backgroundColor } = renderer.options
    expect(renderer.generateSvg('<text x="100" y="100">hello</text>'))
      .toBe(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" font-size="20px" '
        + `viewBox="0 0 ${width} ${height}" width="${width}px" height="${height}px" font-family="Lucida Console, Courier, monospace">`
        + `<rect width="${width}" height="${height}" fill="${backgroundColor}" pointer-events="none"/>`
        + '<text x="100" y="100">hello</text></svg>',
      )
  })

  const text = `哈哈哈哈哈"Well, be off, then!" said the Pigeon in a sulky 
tone, as it settled down again into its nest. Alice 
crouched down among the trees as well as she could, for 
her neck kept getting entangled among the branches, and 
every now and then she had to stop and untwist it. After a 
while she remembered that she still held the pieces of mushroom 
in her hands, and she set to work very carefully, 
nibbling first at one and then at the other, and growing 
sometimes taller and sometimes shorter, until she had 
succeeded in bringing herself down to her usual height.`.replace(/\n/g, '')

  it('addContent', async () => {
    await renderer.addContent({
      type: ContentType.PARAGRAPH,
      text,
    })
    // const currentDir = path.dirname(fileURLToPath(import.meta.url))
    // fs.writeFileSync(path.resolve(currentDir, './uiviewer/1.svg'), renderer.pages[0])
    // fs.writeFileSync(path.resolve(currentDir, './uiviewer/2.svg'), renderer.pages[1])
  })
})
