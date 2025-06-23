import { Component, Pen } from '../../penexutils'
import '../../styles/notification.less'
import { ENV, ITERATION, NAME, VERSION } from '../../constants'

export class NotificationBar implements Component {
    notificationbar!: Pen<HTMLElement>

    constructor() { }

    private showQuote() {
        console.info('car axle client started')
        let quotes = require('../../assets/quotes.json')
        this.showNotification(`${quotes[Math.floor(Math.random() * quotes.length)]}`, `v${VERSION}.${ITERATION} by penguinify. enjoy your stay ;)`)
    }

    public penIt(): Pen<HTMLElement>[] {
        let pens = Pen.fromHTML(`
        <div id="cac-notification-bar">
        </div>
        `)

        this.notificationbar = pens[0]

        this.showQuote()

        return pens
    }

    public showNotification(title: string, message: string) {
        let notification = Pen.fromHTML(`
        <div class="cac-notification rounded-sm">
            <div class="cac-notification-title">${title}</div>
            <div class="cac-notification-message">${message}</div>
        </div>
        `)

        notification[0].setParent(this.notificationbar.element)

        notification[0].element.addEventListener('click', () => {
            notification[0].element.animate(
                {
                    transform: 'translateX(100%)',
                    opacity: 0,
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                }
            )

            setTimeout(() => {
                notification[0].element.remove()
            }, 500)
        })

        setTimeout(() => {
            notification[0].element.animate(
                {
                    transform: 'translateX(100%)',
                    opacity: 0,
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                }
            )

            setTimeout(() => {
                notification[0].element.remove()
            }, 500)
        }, 5000)
    }
}
