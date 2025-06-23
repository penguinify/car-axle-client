import { CREATOR, ENV, ITERATION, NAME, VERSION } from '../../constants'
import { notificationbar } from '../../gui/app'
import { Pen } from '../../penexutils'
import { HandlerDefinition } from '../../types'

function Block(content: Pen<HTMLElement>[]): Pen<HTMLElement>[] {
    let quotes = require('../../assets/quotes.json')
    let pen = Pen.fromHTML(`<div>
                           <h1>${NAME} by ${CREATOR}</h1>
                           <h2>version ${VERSION}.${ITERATION}</h2>
                           <h2 class="divider">on ${ENV}</h2>
                           <h2>${quotes[Math.floor(Math.random() * quotes.length)]}</h2>

                           <h3>made with no love by penguinify</h3>
                           </div>`)

    content[0].element.style.backgroundImage = "url('https://raw.githubusercontent.com/car-axle-client/car-axle-client/main/docs/allinone.svg')"

    pen[0].setParent(content[0].element)
    return pen || []
}

let definition: HandlerDefinition = {
    type: 'block',
    id: 'versionblock',
    handler: Block,
}

export default definition
