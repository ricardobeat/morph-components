
const morphdom = require('morphdom')
const each = Array.prototype.forEach

const definitions = {}
const components = {}
var uid = 0

class Component {

    constructor (name, element, id) {
        this.fn = new definitions[name]
        this.id = id
        this.el = element
        element._component = uid
        // this.fn.events()
    }

    render () {
        morphdom(this.el, `<div>${this.fn.render.call(this).trim()}</div>`, {
            childrenOnly: true
        })
    }

}

module.exports = {

    use (name, module) {
        definitions[name] = module
        return this
    },

    mount (root) {
        var node = (typeof root === 'string') ? document.querySelector(root) : root
        var name = node.getAttribute('data-component')
        var uid = ++uid
        var comp = components[uid] = new Component(name, node, uid)
        comp.render()
        each.call(node.querySelectorAll('[data-component]'), this.mount, this)
    }
}

// --------------------------------------

// module.exports = {
    
//     initialize (Component, element) {
//         var instance = new Component()
//         instance.el = element
//         instance.id = ++uid
//         element._component = uid
//         components[instance.id] = instance
//         return instance
//     },

//     use (name, module) {
//         definitions[name] = module
//         return this
//     },

//     render (component) {
//         var content = component.render().trim()
//         morphdom(component.el, `<div>${content}</div>`, morphdomConfig)
//     },

//     mount (root) {
//         var node = (typeof root === 'string') ? document.querySelector(root) : root
//         var name = node.getAttribute('data-component')
//         var Component = definitions[name]
//         this.render(this.initialize(Component, element))
//         each.call(node.querySelectorAll('[data-component]'), this.mount, this)
//     }
// }
