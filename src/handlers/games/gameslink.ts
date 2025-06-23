import { GAMESLINK } from '../../constants'
import { Dropdown } from '../../gui/components/content/dropdown.component'
import { Elements, Pen } from '../../penexutils'
import { HandlerDefinition } from '../../types'

function Block(content: Pen<HTMLElement>[]): Pen<Elements>[] {
    let pens: Pen<HTMLElement>[] = Pen.fromHTML(`
        <div>
        <h1>game link selector</h1>
        <p>due to bandwidth limits, hosting games has become nearly impossible for me. You can create your own links by cloning the selenite repository and following their link creating instructions.</p>
        </div>`)

    pens[0].setParent(content[0].element)
    return pens || []
}

let definition: HandlerDefinition = {
    type: 'block',
    id: 'gameslinkblock',
    handler: Block,
}

export default definition
