function createElement(tag, className, id, textContent, innerHTML, attributes = {}, eventListeners = []) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (id) element.id = id;
    if (innerHTML) element.innerHTML = innerHTML;
    if (textContent) element.textContent = textContent;
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    eventListeners.forEach(({ type, handler }) => element.addEventListener(type, handler));
    return element;
}

function createRecipeCard(item) {
    const div = createElement('div', 'recipe-card');

    const img = createElement('img', null, null, null, null, { src: "/images/image.jpg", height: 150, width: 200 });
    div.appendChild(img);

    const actionBtn = createElement('div', 'action-btn');

    const spanView = createElement('span', 'view', null, null, '<i class="material-icons">import_contacts</i>', {}, [
        { type: 'click', handler: () => window.location.replace(`/edit.html?${item?.id}`) }
    ]);
    actionBtn.appendChild(spanView);

    const meal = createElement('h5', null, null, null, item?.meal?.toLowerCase() || "");
    actionBtn.appendChild(meal);

    const spanEdit = createElement('span', 'edit', null, null, '<i class="material-icons">&#xe22b;</i>', {}, [
        { type: 'click', handler: () => window.location.replace(`/edit.html?${item?.id}`) }
    ]);
    actionBtn.appendChild(spanEdit);

    const spanDelete = createElement('span', 'delete', null, null, '<i class="material-icons ">&#xe872;</i>', {}, [
        { type: 'click', handler: () => handleDeleteItem(item?.id) }
    ]);
    actionBtn.appendChild(spanDelete);

    div.appendChild(actionBtn);

    const h4 = createElement('h4', null, null, null, item.name);
    div.appendChild(h4);

    return div;
}

const getData = (search) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const recipeList = document?.getElementsByClassName('recipes-list')[0]
    recipeList?.querySelectorAll('recipe-card').forEach(n => n.remove())
    const searchList = search ? localData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.name.toUpperCase().includes(search.toUpperCase())) : localData
    if (searchList.length) {
        searchList.forEach((item) => {
            recipeList.appendChild(createRecipeCard(item))
        })
    }
    else {
        const h1 = createElement('h1', 'text-center', null, "You have not any recipe please add first")
        recipeList.appendChild(h1)
    }

}

const handleSearch = () => {
    const search = document.getElementsByName('search')[0].value
    getData(search)
}

const handleViewItem = (item) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const formData = localData?.filter(({ id }) => id === item)[0]
    document.getElementsByName('name')[0].value = formData?.name;
    document.getElementsByName('id')[0].value = formData?.id;
    document.getElementsByName('ingredients')[0].value = formData?.ingredients
    document.getElementsByName('details')[0].value = formData?.details
    document.getElementsByName('category')[0].value = formData?.category
    document.getElementsByName('meal')[0].value = formData?.meal
}

const handleEditItem = () => {
    const id = document.getElementsByName('id')[0].value
    const name = document.getElementsByName('name')[0].value
    const ingredients = document.getElementsByName('ingredients')[0].value
    const details = document.getElementsByName('details')[0].value
    const category = document.getElementsByName('category')[0].value
    const meal = document.getElementsByName('meal')[0].value
    if (name.trim() && ingredients && details && category && meal) {
        const localData = JSON.parse(localStorage.getItem("data")) || []
        const index = localData.findIndex(item => item.id === id)
        localData[index] = { id, name, ingredients, details, category, meal }
        localStorage.setItem('data', JSON.stringify(localData))
        alert('Recipe has been Updated')
        window.location.replace("./recipies.html")
    }
}

const handleIdChange = () => {
    const name = document.getElementsByName('name')[0].value
    const localData = JSON.parse(localStorage.getItem("data")) || []
    document.getElementsByName('id')[0].value = `${name?.toLowerCase()?.replaceAll(" ", "-")}${localData.length + 1}`
}

const handleDeleteItem = (id) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const deletedData = localData?.filter((item) => item?.id !== id)
    localStorage.setItem("data", JSON.stringify(deletedData))
    window.location.reload()
}

const handleAddItem = () => {
    const name = document.getElementsByName('name')[0].value
    const id = document.getElementsByName('id')[0].value
    const ingredients = document.getElementsByName('ingredients')[0].value
    const details = document.getElementsByName('details')[0].value
    const category = document.getElementsByName('category')[0].value
    const meal = document.getElementsByName('meal')[0].value
    if (name.trim() && ingredients && details && category && meal) {
        const localData = JSON.parse(localStorage.getItem("data")) || []
        localData.push({ name, ingredients, details, id, meal, category })
        localStorage.setItem('data', JSON.stringify(localData))
        alert('Recipe has been added')
        window.location.replace("./recipies.html")
    }
    else {
        alert('all fields are required!')
    }
}

const handeNextClick = (container) => {
    const slidesContainer = document.getElementById(container);
    const slide = document.querySelector(".slide");
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
}

const handlePrevClick = (container) => {
    const slidesContainer = document.getElementById(container);
    const slide = document.querySelector(".slide");
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
}

const handleMenu = (showMenu, closeMenu) => {
    const show = showMenu.split('#')
    const close = closeMenu.split('#')
    let menuBtn = document.querySelector(showMenu)
    menuBtn.className = menuBtn.className !== `hide-${show[1]}` ? `hide-${show[1]}` : `show-${show[1]}`
    let closeBtn = document.querySelector(closeMenu)
    closeBtn.className = closeBtn.className !== `hide-${close[1]}` ? `hide-${close[1]}` : `show-${close[1]}`
    let mobNav = document.querySelector('#mobNav')
    mobNav.className = mobNav.className !== `hide-close` ? `hide-close` : `show-close`
}

const sliderData = [{
    title: "Daal",
    items: [
        "./images/chana-daal.jpg",
        "./images/daal-curry.jpeg",
        "./images/daal-palak.jpg",
        "./images/dosa-daal.jpg",
        "./images/moong-daal.jpg",
        "./images/moong-dosa.jpg",
        "./images/pepper-daal.jpg",
        "./images/saag-daal.jpg",
    ]

}, {
    title: "Rice", items: [
        "./images/basic-rice.jpg",
        "./images/chopstick-rice.jpg",
        "./images/microwave-rice.jpg",
        "./images/pepsi-rice.jpg",
        "./images/perfect-sushi-rice.jpg",
        "./images/rice-bowl.png",
        "./images/shushi-rice.jpg",
        "./images/rice-cereal.jpg",
        "./images/sushi-rice-bowl.jpg",]
}, {
    title: "Roti", items: [
        "./images/fried-roti.jpg",
        "./images/roti.jpg",
        "./images/roti-wraps.jpg",
        "./images/roti-jala.jpg",
        "./images/simple-roti.jpg",
        "./images/sweet-potato-roti.jpg",
        "./images/sweet-roti.jpg",
        "./images/weekend-roti.jpeg",
    ]
}]

const makeDataSlider = () => {
    let homePage = document.querySelector('.home-page')
    sliderData.map(({ title, items }, index) => {
        let section = createElement('section', 'slider-wrapper')

        let h3 = createElement('h3', null, null, title)
        section.appendChild(h3)

        let prevBtn = createElement('span', "slide-arrow", "slide-arrow-prev", null, '&#8249;', {}, [{ type: 'click', handler: function () { handlePrevClick(`slides-container${index + 1}`) } }])
        section.appendChild(prevBtn)

        let nextBtn = createElement('span', "slide-arrow", "slide-arrow-next", null, '&#8250;', {}, [{ type: 'click', handler: function () { handeNextClick(`slides-container${index + 1}`) } }])
        section.appendChild(nextBtn)

        let ul = createElement('ul',"slides-container",`slides-container${index + 1}`)

        items.map((subItem) => {
            let li = createElement('li','slide')
            let img = createElement('img',null,null,null,null,{src:subItem})
            li.appendChild(img)
            ul.appendChild(li)
        })
        section.appendChild(ul)
        homePage.appendChild(section)
    })
}

window.onload = () => {
    switch (window.location.pathname) {
        case '/recipies.html':
            return getData('')
        case '/edit.html':
            return handleViewItem(window.location.search.replace('?', ''))
        case '/home.html':
            return makeDataSlider()
        default:
            return ""
    }
}

