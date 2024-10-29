import {
  existsSync as existsSyncNode,
  mkdirSync as mkdirSyncNode,
  readFileSync as readFileSyncNode,
  writeFileSync as writeFileSyncNode,
} from 'node:fs'
import type {
  MakeDirectoryOptions,
  WriteFileOptions,
} from 'node:fs'

const imageRecord: Record<string, Uint8Array> = {}

function writeFileSync(file: string, data: Uint8Array, options?: WriteFileOptions): void {
  if (__BROWSER__) {
    imageRecord[file] = data
  }
  else {
    writeFileSyncNode(file, data, options)
  }
}

function readFileSync(file: string, _options?: {
  encoding?: null | undefined
  flag?: string | undefined
} | null) {
  if (__BROWSER__) {
    return imageRecord[file]
  }
  else {
    return readFileSyncNode(file)
  }
}

function existsSync(file: string): boolean {
  if (__BROWSER__) {
    return imageRecord[file] !== undefined
  }
  else {
    return existsSyncNode(file)
  }
}

function mkdirSync(dir: string, _options: MakeDirectoryOptions & {
  recursive: true
}): string | undefined {
  if (__BROWSER__) {
    imageRecord[dir] = new Uint8Array()
    return undefined
  }
  else {
    return mkdirSyncNode(dir, _options)
  }
}

export {
  writeFileSync,
  readFileSync,
  existsSync,
  mkdirSync,
}