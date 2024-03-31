
const getData = (search) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const recipeList = document?.getElementsByClassName('recipes-list')[0]
    recipeList?.querySelectorAll('recipe-card').forEach(n => n.remove())
    const searchList = search ? localData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.name.toUpperCase().includes(search.toUpperCase())) : localData
    if (searchList.length) {
        searchList.forEach((item) => {
            let div = document.createElement('div')
            div.className = 'recipe-card'
            let img = document.createElement('img')
            img.src = "/images/image.jpg"
            img.height = 150
            img.width = 200
            div.appendChild(img)
            let actionBtn = document.createElement('div')
            actionBtn.className = "action-btn"
            let spanView = document.createElement('span')
            spanView.className = "view"
            spanView.addEventListener('click', function (e) {
                window.location.replace(`/edit.html?${item?.id}`)
            })
            spanView.innerHTML = `<i class="material-icons">import_contacts</i>`
            actionBtn.appendChild(spanView)
            let meal = document.createElement('h5')
            meal.textContent = item?.meal?.toLowerCase() || ""
            actionBtn.appendChild(meal)
            let spanEdit = document.createElement('span');
            spanEdit.className = "edit"
            spanEdit.addEventListener('click', function (e) {
                window.location.replace(`/edit.html?${item?.id}`)
            })
            spanEdit.innerHTML = `<i class="material-icons">&#xe22b;</i>`
            actionBtn.appendChild(spanEdit)
            let spanDelete = document.createElement('span');
            spanDelete.className = "delete"
            spanDelete.addEventListener('click', function () { handleDeleteItem(item?.id) })
            spanDelete.innerHTML = `<i class="material-icons ">&#xe872;</i>`
            actionBtn.appendChild(spanDelete)
            div.appendChild(actionBtn)
            let h4 = document.createElement('h4')
            h4.textContent = item.name
            div.appendChild(h4)
            recipeList.appendChild(div)
        })
    }
    else {
        const h1 = document.createElement('h1')
        h1.textContent = "You have not any recipe please add first"
        h1.style = 'text-align:"center"'
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
        localData[index]['id'] = id
        localData[index]['name'] = name
        localData[index]['ingredients'] = ingredients
        localData[index]['details'] = details
        localData[index]['category'] = category
        localData[index]['meal'] = meal
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
        let section = document.createElement('section')
        section.className = "slider-wrapper"
        let h3 = document.createElement('h3')
        h3.textContent = title
        section.appendChild(h3)
        let prevBtn = document.createElement('span')
        prevBtn.addEventListener('click', function () { handlePrevClick(`slides-container${index + 1}`) })
        prevBtn.className = "slide-arrow"
        prevBtn.id = "slide-arrow-prev"
        prevBtn.innerHTML = '&#8249;'
        section.appendChild(prevBtn)
        let nextBtn = document.createElement('span')
        nextBtn.addEventListener('click', function (e) {
            handeNextClick(`slides-container${index + 1}`)
        })
        nextBtn.className = "slide-arrow"
        nextBtn.id = "slide-arrow-next"
        nextBtn.innerHTML = '&#8250;';
        section.appendChild(nextBtn)
        let ul = document.createElement('ul')
        ul.className = "slides-container slider"
        ul.id = `slides-container${index + 1}`
        items.map((subItem) => {
            let li = document.createElement('li')
            li.className = 'slide'
            let img = document.createElement('img')
            img.src = subItem
            li.appendChild(img)
            ul.appendChild(li)
        })
        section.appendChild(ul)
        homePage.appendChild(section)
    })
}

window.onload = () => {
    window.location.pathname === '/recipies.html' ? getData('')
        : window.location.pathname === '/edit.html' ?
            handleViewItem(window.location.search.replace('?', '')) :
            window.location.pathname === '/home.html' ?
                makeDataSlider() : ""

}

