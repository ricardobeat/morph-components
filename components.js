
const morphdom = require('morphdom')
const slice = Array.prototype.slice

var uid = 0

const definitions = {}
const components  = {}

function qs (selector, context = document) {
    return slice.call(context.querySelectorAll(selector), 0)
}

// -----------------------------------------------------------------------------

function initialize (Component, element) {
    var instance = components[++uid] = new Component()
    element._component = uid
    return Object.assign(instance, {
        el: element,
        id: uid,
    })
}

function load (element) {
    var name = element.getAttribute('data-component')
    if (!name) return

    var Component = definitions[name]
    if (!Component) throw new Error(`Component ${name} does not exist`)

    render(initialize(Component, element))
}

function render (component) {
    let rendered = `<div>${component.render().trim()}</div>`
    morphdom(component.el, rendered, {
        childrenOnly: true
    })
}

function register (name, def) {
    definitions[name] = def
    return exports
}

function mount (root) {
    if (typeof root === 'string') {
        root = document.querySelector(root)
    }
    load(root)
    qs('[data-component]', root).forEach(mount, this)
}

module.exports = {
    definitions,
    components,
    initialize,
    load,
    register,
    mount
}