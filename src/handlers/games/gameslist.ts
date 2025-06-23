import { GAMESLINK } from '../../constants'
import { notificationbar } from '../../gui/app'
import { Button } from '../../gui/components/content/button.component'
import { Input } from '../../gui/components/content/input.component'
import { Elements, Pen } from '../../penexutils'
import { Game, HandlerDefinition } from '../../types'

function changeGame(url: string) {
    ;(document.getElementById('gamesiframe') as HTMLIFrameElement).src = atob(GAMESLINK.currentLink) + url
}

function searchGame(input: string, gamesJSON: Game[]) {
    let gamesElements: NodeListOf<HTMLElement> = document.querySelectorAll('#cac-gameslistblock div')
    input = input.toLowerCase()
    for (let [index, game] of gamesJSON.entries()) {
        gamesElements[index].style.display = game.n.toLowerCase().includes(input) ? 'block' : 'none'
    }

    if (input.includes('v8.1 is better')) {
        notificationbar.showNotification('no', 'v8.1 is not better no one likes u and ur opinion is invalid')
        notificationbar.showNotification('no', 'v8.1 is not better no one likes u and ur opinion is invalid')
        notificationbar.showNotification('no', 'v8.1 is not better no one likes u and ur opinion is invalid')
        notificationbar.showNotification('no', 'v8.1 is not better no one likes u and ur opinion is invalid')
        notificationbar.showNotification('no', 'v8.1 is not better no one likes u and ur opinion is invalid')
    }
}

function Block(content: Pen<HTMLElement>[]): Pen<Elements>[] {
    let pens: Pen<HTMLElement>[] = Pen.fromHTML(`
        <div style="
        height: 50vh;
        overflow-y: scroll;
        " id="cac-gameslistblock"">

            <h1 class="divider">game selector</h1>
        </div>`)

    let gamesJSON: Game[] = require('../../assets/games.json')

    // this is the search box btw
    pens.push(
        ...new Input(
            pens[0],
            {
                type: 'input',
                id: 'searchgame',
                handler: (input: string) => searchGame(input, gamesJSON),
            },
            'search for a game'
        ).penIt()
    )

    for (let game of gamesJSON) {
        pens.push(
            ...new Button(pens[0], game.n, {
                type: 'button',
                id: game.n,
                handler: () => changeGame(game.u),
            }).penIt()
        )
    }

    pens[0].setParent(content[0].element)
    return pens || []
}

let definition: HandlerDefinition = {
    type: 'block',
    id: 'gameslistblock',
    handler: Block,
}

export default definition
