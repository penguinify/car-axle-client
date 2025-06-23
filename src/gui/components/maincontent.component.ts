import { Component, Elements, Pen } from '../../penexutils'
import { Content, HandlerDefinition } from '../../types'
import { Block } from './content/block.component'
import { Condition } from './content/condition.component'
import { Iframe } from './content/iframe.component'
import { Input } from './content/input.component'
import { Module } from './content/module.component'

export class MainContent implements Component {
    private title: string
    private description: string
    public maincontent!: Pen<HTMLElement>
    public content: Content[] = []

    constructor(title: string, description: string, content: Content[], enabled: boolean = false) {
        this.title = title
        this.description = description
        this.content = content

        if (enabled) {
            //@ts-ignore
            window.enabled = this

            // wait for the page to load
            setTimeout(() => {
                this.show()
            }, 1)
        }
    }

    public show(): void {
        this.maincontent.element.style.display = 'block'

        this.maincontent.element.animate(
            [
                {
                    transform: 'translateY(-10vh)',
                    opacity: 0,
                },
                {
                    transform: 'translateY(0px)',
                    opacity: 1,
                },
            ],
            {
                duration: 300,
                easing: 'cubic-bezier(0,.41,.42,.98)',
                fill: 'forwards',
            }
        )

        setTimeout(() => {
            this.maincontent.element.style.display = 'block'
        }, 300)
    }

    public hide(): void {
        this.maincontent.element.style.display = 'none'
    }

    public penIt(): Pen<HTMLElement>[] {
        let pens =
            Pen.fromHTML(`
            <div class="maincontent layer2 rounded-md">
            <div class="maincontent-header">
                <h1 class="maincontent-header-text">${this.title}</h1>
                <p class="maincontent-description">${this.description}</p>
            </div>
            </div>
        `) || []

        this.maincontent = pens[0]

        this.content && pens.push(...this.addContent())

        return pens
    }

    private addContent(): Pen<Elements>[] {
        let pens: Pen<Elements>[] = []

        let handlers: { [key: string]: HandlerDefinition } = {}

        // Gets all the handlers from the handlers folder
        let context = require.context('../../handlers/', true, /\.ts$/)
        context.keys().forEach((key) => {
            let handler = context(key).default
            try {
                handlers[handler.id] = handler

                if (handler === undefined) throw new Error(`Handler: ${handler.id} is undefined`)
            } catch (e) {
                console.error(`Failed to load handler ${key}: ${e}`)
            }
        })

        this.content.forEach((content) => {
            try {
                switch (content.type) {
                    case 'iframe':
                        pens.push(new Iframe(this.maincontent, content.src, content.id, content.controls).penIt()[0])
                        break
                    case 'block':
                        pens.push(new Block(this.maincontent, handlers[content.handler]).penIt()[0])
                        break
                    case 'module':
                        pens.push(new Module(this.maincontent, content.name, content.description, handlers[content.handler]).penIt()[0])
                        break
                    case 'input':
                        pens.push(new Input(this.maincontent, handlers[content.handler], content.placeholder).penIt()[0])
                        break
                }
            } catch (e) {
                console.error(`Failed to load content ${content}: ${e}`)
            }
        })

        return pens
    }
}
