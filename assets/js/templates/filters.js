import { toggleBtn, displayCross, clearInputs, filterList } from "../utils/utils.js"


// CREATE ELEMENTS FILTERS

export default function templateFilters(data) {

    const filters = [
        { type: 'ingredients', name: 'Ingrédients' },
        { type: 'appliances', name: 'Appareils' },
        { type: 'ustensils', name: 'Ustensiles' }
    ]

    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters-content', 'd-flex', 'flex-column', 'flex-md-row', 'col-12', 'col-md-10', 'col-xl-8', 'gap-md-5')

        
    filters.forEach(({ type, name }) => {
        const container = document.createElement('div')
        container.classList.add('select-container', `select-${type}-container`, 'py-2', 'py-md-4')
        container.style.cursor = 'pointer'

        const label = document.createElement('div')
        label.classList.add('select-label', 'bg-white', 'rounded', 'd-flex', 'justify-content-between', 'align-items-center')

        const title = document.createElement('span')
        title.classList.add('title', `${type}-title`)
        title.textContent = `${name}`

        const dropdownBtn = document.createElement('span')
        dropdownBtn.classList.add('dropdown-btn', 'fa-solid', 'fa-chevron-down')

        label.append(title, dropdownBtn)

        const dropdown = document.createElement('div')
        dropdown.classList.add('select-content-dropdown', 'bg-white', 'rounded-bottom')
        dropdown.style.display = 'none'

        const form = document.createElement('form')
        form.classList.add('select-input', 'rounded', 'd-flex', 'justify-content-between', 'border', 'bg-white', 'p-1', 'mx-3', 'mb-4', 'mb-md-3')

        const input = document.createElement('input')
        input.classList.add('input', `search-${type}`, 'border-0', 'col-10', 'col-md-8')

        const searchActions = document.createElement('div')
        searchActions.classList.add('d-flex', 'col-2', 'col-md-4', 'justify-content-around', 'align-items-center')

        const clearBtn = document.createElement('span')
        clearBtn.classList.add(`clear-button-${type}`, 'd-flex', 'justify-content-center', 'align-items-center')

        const xIcon = document.createElement('i')
        xIcon.classList.add('cross', `xmark-${type}`, 'fa-solid', 'fa-xmark')
        clearBtn.appendChild(xIcon)

        const glassIcon = document.createElement('i')
        glassIcon.classList.add(`glass-${type}`, 'fa-solid', 'fa-magnifying-glass')

        searchActions.append(clearBtn, glassIcon)
        form.append(input, searchActions)

        const selectType = document.createElement('div')
        selectType.classList.add(`select-${type}`)

        const ul = document.createElement('ul')
        ul.classList.add('p-0')

        const dataList = data[type] 
        // type = successivement ingredients / appliances / ustensils 
        // en fonction de ce que traite la boucle forEach
        // si traite type ingredients provenant de la const filters
        // alors va chercher objet "ingrédients" dans mon objet passé
        // depuis index.

        dataList.forEach(data => {
            const li = document.createElement('li')
            li.setAttribute('data-id', data)
            li.setAttribute('data-type', type)
            li.textContent = data
            ul.appendChild(li)
        });

        selectType.appendChild(ul)
        dropdown.append(form, selectType)
        container.append(label, dropdown)
        filtersContainer.append(container)

    
        // LISTENERS (dans élément sinon pas lu dans DOM => dynamique)

        container.addEventListener('click', toggleBtn)
        input.addEventListener('input', displayCross)
        clearBtn.addEventListener('click', clearInputs)
        input.addEventListener('input', (e) => filterList(e, ul));
        
    })


    return filtersContainer

}