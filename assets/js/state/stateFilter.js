export default class StateFilter {
    constructor() {
        this.searchLength   = 0
        this.search         = []
        this.appliances     = []
        this.ingredients    = []
        this.ustensils      = []
        this.tags           = []
    }

    setSearch(value) {
        this.search = value.toLowerCase().split(' ')
        this.searchLength = value.length
    }

    unsetSearch() {
        this.search = []
        this.searchLength = 0
    }

    setIngredients(value) {
        this.ingredients.push(value.toLowerCase())

    }

    unsetIngredients(value) {
        this.ingredients = this.ingredients.filter(ingredient => ingredient !== value)
    }

    setAppliances(value) {
        this.appliances.push(value.toLowerCase())
    }

    unsetAppliances() {
        this.appliances = []
    }

    setUstensils(value) {
        this.ustensils.push(value.toLowerCase())
    }

    unsetUstensils(value) {
        this.ustensils = this.ustensils.filter(ustensil => ustensil !== value)

    }

    setTags(value) {
        this.tags.push(value);
    }

    getTags() {
        return this.tags
    }

    unsetTags(value) {
        this.tags = this.tags.filter(tag => tag !== value);
    }

    unsetAll() {
        this.searchLength   = 0
        this.search         = []
        this.appliances     = []
        this.ingredients    = []
        this.ustensils      = []
        this.tags           = []
    }
    
}


