import { Components, elementGlobals } from './penexutils'

// Default layout
const defaultLayout = `
        <div id="main-app" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw;">
            <h1>Welcome to penex ui framework</h1>
            <h2>@penguinify</h2>
        </div>
    `

function setup(app: string, layout: string = defaultLayout, components?: Components) {
    document.body.innerHTML = layout + document.body.innerHTML

    let mainApp = document.getElementById(app)

    if (mainApp === null) {
        throw new Error('Could not find app element')
    }

    // debug hide
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case '\\':
                if (mainApp === null) return
                mainApp.style.display = mainApp.style.display === 'none' ? 'flex' : 'none'
                break
            case 'F2':
                alert('penex ui framework is loaded')
                break
        }
    })

    if (components === undefined) return
    for (let i = 0; i < components.pens.length; i++) {
        try {
            if (components.pens[i].parent === elementGlobals.mainApp) mainApp.appendChild(components.pens[i].element)
        } catch (e) {
            throw 'Error: ' + e + ' at component ' + components.pens[i]
        }
    }

    components.scripts.forEach((script) => {
        try {
            script()
        } catch (e) {
            throw 'Error: ' + e + ' at script ' + script
        }
    })
}

export { setup }
