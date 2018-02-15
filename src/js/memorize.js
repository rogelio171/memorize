const LEVELS = 15
let keys = generateKeys(LEVELS)

function generateRandomKey() {
    const MIN = 65
    const MAX = 90

    return Math.round(Math.random() * (MAX - MIN) + MIN)
}

function generateKeys(levels) {
    return new Array(levels).fill(0).map(generateRandomKey)
}

function nextRound(actualLevel) {
    if (actualLevel == LEVELS) {
        return swal({
            title: 'Congratulations',
            text: 'You Win!',
            icon: 'success',
            button: 'Close'
        })
    }

    swal({
        timer: 1000,
        title: `Level ${actualLevel + 1}`,
        buttons: false
    })

    for (let i = 0; i <= actualLevel; i++) {
        setTimeout(() => {
            activate(keys[i])
        }, 1000 * (i + 1) + 1000)

    }

    let i = 0
    let actualKey = keys[i]
    window.addEventListener('keydown', onKeyDown)

    function onKeyDown(event) {
        if (event.keyCode == actualKey) {
            activate(actualKey, { success: true })
            i++

            if (i > actualLevel) {
                window.removeEventListener('keydown', onKeyDown)
                setTimeout(() => {
                    nextRound(i)
                }, 1500)
            }

            actualKey = keys[i]
        } else {
            activate(event.keyCode, { fail: true })
            window.removeEventListener('keydown', onKeyDown)
            swal({
                title: 'You Lose!',
                text: 'Do you want to play again?',
                icon: 'error',
                buttons: {
                    ok: 'Yes',
                    cancel: 'No'
                }
            }).then((ok) => {
                if (ok) {
                    keys = generateKeys(LEVELS)
                    nextRound(0)
                }
            })
        }
    }
}

nextRound(0)

function getElementByKeyCode(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
    const element = getElementByKeyCode(keyCode)
    element.classList.add('active')
    if (opts.success) {
        element.classList.add('success')
    } else if (opts.fail) {
        element.classList.add('fail')
    }
    setTimeout(() => {
        deactivate(element)
    }, 500)
}

function deactivate(element) {
    element.className = 'key'
}