
const getData = () => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const recipeList = document?.getElementsByClassName('recipes-list')[0]
    localData.forEach((item) => {
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

const handleViewItem = (item) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const formData = localData?.filter(({ id }) => id === item)[0]
    document.getElementsByName('name')[0].value = formData?.name;
    document.getElementsByName('id')[0].value = formData?.id;
    document.getElementsByName('ingredients')[0].value = formData?.ingredients
    document.getElementsByName('details')[0].value = formData?.details
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
        localData[index]['category'] = details
        localData[index]['meal'] = details
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

window.onload = () => {
    window.location.pathname === '/recipies.html' ? getData()
        : window.location.pathname === '/edit.html' ?
            handleViewItem(window.location.search.replace('?', '')) : ''

}

