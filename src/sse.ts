export function* sse(text: string): Iterable<string> {
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === lastIndex(lines)) {
      yield `data: ${line}\n\n`
    } else {
      yield `data: ${line}\n`
    }
  }
}

function lastIndex(arr: Array<unknown>): number {
  return arr.length - 1
}
