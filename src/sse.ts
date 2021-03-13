export interface IMessage {
  event?: string
  data: string
  id?: string
  retry?: number
}

export function* sse(message: IMessage): Iterable<string> {
  if (message.event) yield `event: ${message.event}\n`

  for (const line of message.data.split('\n')) {
    yield `data: ${line}\n`
  }

  if (message.id) yield `id: ${message.id}\n`
  if (message.retry) yield `retry: ${message.retry}\n`

  yield '\n'
}
