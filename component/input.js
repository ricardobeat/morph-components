
class Input {

    events () {
        return {
            'change input': this.onInputChanged
        }
    }

    onInputChanged (e) {
        if (/fox/.test(e.target.value)) {
            
        }
    }

    render () {
        return `
            <input type="text" placeholder="Search stuff" value="${state.query}" />
            <input type="text" placeholder="Search stuff" value="${state.query}" />
        `
    }
}

module.exports = Input
