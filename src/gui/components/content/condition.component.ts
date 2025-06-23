import { Component, Pen } from '../../../penexutils'
import { HandlerDefinition } from '../../../types'

export class Condition implements Component {
    private parent: Pen<HTMLElement>
    private handler: HandlerDefinition

    constructor(parent: Pen<HTMLElement>, handler: HandlerDefinition) {
        if (handler.type !== 'condition') {
            throw new Error('Handler is not a block')
        }

        this.handler = handler
        this.parent = parent
    }

    public penIt(): Pen<HTMLElement | HTMLInputElement>[] {
        // @ts-ignore -> type is condition so it has args and exists, if it doesn't, it will throw an error
        this.handler.handler()

        return []
    }
}
