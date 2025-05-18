// ESCAPE INJECTIONS

export function escapeInjection(value) {
    return value
    .replace(/&/g, '&amp;') // Remplace '&' par '&amp;'
    .replace(/</g, '&lt;') // Remplace '<' par '&lt;'
    .replace(/>/g, '&gt;') // Remplace '>' par '&gt;'
    .replace(/"/g, '&quot;') // Remplace '"' par '&quot;'
    .replace(/'/g, '&#39;') // Remplace "'" par '&#39;'
    .replace(/`/g, '&#96;') // Remplace '`' par '&#96;'
}

// OPEN/CLOSE DROPDOWNS MENUS

export function toggleBtn(event) {
    const container = event.target.closest('.select-container')
    const target = container.querySelector('.dropdown-btn')

    if (event.target.closest('form')) return
    // comme container.addEventListener('click', toggleBtn) => chaque clic toggle bloc.
    // Sauf que input dans container => bloquer toggle avec if. 
    target.classList.contains('fa-chevron-down') ? target.classList.replace('fa-chevron-down', 'fa-chevron-up') : target.classList.replace('fa-chevron-up', 'fa-chevron-down')

    stateDropdowns(target)
    closeOtherMenus(target)
}

function stateDropdowns(target) {

    const container = target.closest('.select-container')
    const input = container.querySelector('input')
    const menu = container.querySelector('.select-content-dropdown')
    const cross = input.closest('form').querySelector('.cross')
    const isOpening = target.classList.contains('fa-chevron-up') //renvoie booléen

    if (isOpening) {
        menu.classList.add('open-dropdown') 
        menu.style.display = 'block'
    } else {
        menu.classList.remove('open-dropdown')
        menu.style.display = 'none'
        input.value = ''
        cross.style.visibility = 'hidden'
    }
}


function closeOtherMenus(target) {
    const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
    allDropdownBtns.forEach((btn) => {
        if (btn !== target) {
            closeMenus(btn)
        }
    })
}

function closeMenus(btn) {

    const container = btn.closest('.select-container')
    const input     = container.querySelector('input')
    const menu      = container.querySelector('.select-content-dropdown')
    const cross     = input.closest('form').querySelector('.cross')

    btn.classList.add('fa-chevron-down')
    btn.classList.remove('fa-chevron-up')
    menu.classList.remove('open-dropdown')
    menu.style.display ='none'
    input.value = ''
    cross.style.visibility = 'hidden'
}

document.addEventListener('click', (event) => {
     if (!event.target.closest('.select-container')) {
        const allDropdownBtns = document.querySelectorAll(".dropdown-btn")
        allDropdownBtns.forEach((btn) => {
            closeMenus(btn)
        })
    }
})


// INPUTS
export function filterList(e, ul) {
    const string = e.target.value.toLowerCase().trim();
    const value = escapeInjection(string)

    const filterItems = ul.querySelectorAll('li');

    filterItems.forEach(filter => {
        const textFilter = filter.textContent
        const words = textFilter.split(' ') // suppr. espaces en faisant de plusieurs mots des "morceaux" / mots uniques
        
        const matchingValue = words.some(word => word.startsWith(value)) 
        //.some() teste si au moins un élément du tableau passe le test fourni
        //.startsWith() renvoie un booléen. Check si chaine de caractères commence par caractères fournie en argument (cf. MDN)

        if (matchingValue) {
            filter.style.display = 'block';
        } else {
            filter.style.display = 'none';
        }
    });
}

export function displayCross(event) {
    const target = event.target
    const cross = target.closest('form').querySelector('.cross')
    target.value === "" ? cross.style.visibility ='hidden' : cross.style.visibility ='visible'
}

// CLEAR INPUTS
export function clearInputs(e) {
    const target = e.target
    const input = target.closest("form").querySelector("input")
    target.style.visibility ='hidden'
    input.value = ''

    const dropdown = target.closest('.select-content-dropdown'); 
    // fonction utilisée sur 1 élement statique et 3 dynamiques
    // donc doit trouver le dropdown seulement si existe. Car pas présent dans la barre de recherche du header (elem. statique)
    if (dropdown) {
        const ul = dropdown.querySelector('ul');
        const filterItems = ul.querySelectorAll('li');
        filterItems.forEach(filter => {
            filter.style.display = 'block';
        });
    }

}

// REMOVE TAGS

export function removeAllTags() {
    const tagsContainer     = document.querySelector('.tags-container')
    const tags              = tagsContainer.querySelectorAll('.tag')

    tags.forEach(tag => tag.remove())

}