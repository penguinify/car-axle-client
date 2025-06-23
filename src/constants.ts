export var GAMESLINK = {
    currentLink: 'aHR0cHM6Ly9zZWxlbml0ZS5jYy9zZW1hZy8=',
}
export const VERSION = 10
export const ITERATION = 0

export const NAME = 'car axle'
// please credit if u change the creator
export const CREATOR = 'penguinify'

export var ENV = 'production'
if (document.location.hostname.includes('localhost')) {
    ENV = 'development'
} else if (document.location.hostname.includes('github.io/car-axle-client')) {
    ENV = "i hoped this wouldn't need to exist -- BETA"
}

// DO NOT CHANGE UNLESS YK WHAT U DOIN
export const DATABASE = 'https://raw.githubusercontent.com/car-axle-client/car-axle-database/main/'
