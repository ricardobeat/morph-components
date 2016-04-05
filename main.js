
var Components = require('./components')
    .register('searchbox', require('./components/searchbox'))
    .register('input', require('./components/input'))

Components.mount('#app')
