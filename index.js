
const addButtonClick = (route) => {
    const routeArray = ['home-page', 'add-modal', 'recipe-page']
    routeArray.forEach((item) => {
        if (item !== route) {
            const ele = document.getElementsByClassName(item)
            ele[0].style.display = "none";
        }
        else {
            const ele = document.getElementsByClassName(route)
            ele[0].style.display = "block"
            if (route === 'recipe-page') {
                const localData = JSON.parse(localStorage.getItem("data")) || []
                const recipeList = document.getElementsByClassName('recipes-list')[0];
                recipeList.innerHTML = ""
                localData.map((item) => {
                    recipeList.innerHTML +=
                        `
                    <div class="recipe-card ">
                    <img src="https://edamam-product-images.s3.amazonaws.com/web-img/345/345bceefebcb99221de892573a6edef6.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCQyfGmkWRDCOCmGGTwNZu%2ByrSG6OC8MX7bXBRUpWdABgIgURzVP01p5CN1%2F4%2FBjfWGA%2F6EPpSP96txG0%2B%2FePgzLrIqwgUIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDEKd6%2F6OOq0PB65lxiqWBdyeZ5Vo%2FuQ3ctC0c2K%2F85Ocrd99v4FNArdWpXPxO6U%2B2VuAU%2FMTxNGeD7Xp30OTx1%2FDk%2B3Y18s8%2BgSZ0yulP%2FGAj%2BXHA5KHYGYnf%2BtynHn%2FBZ5%2F91%2FIyGkv1zaAwGwWrkZmcxK1T8xJPL%2FBSch%2FompFHCo5T8qoQ40YA0bXPP5%2Fon0QVBRhpeoXJVaGMtPrCN6I%2BID7Jn8sriMjRvxUW1sOK0alwXa6Em9jJVe1eFQubfbz1G9fQwkg0%2BEafroN329UuXMwyT%2FJYU%2B3%2Bm36E%2F0O1KUy%2BcPSYtYYIzFVEDjGCMYlEvdGVIXFEiqCWAE2D0PW2cK1tEuG0AcGE8%2BWUPAb1jw1ApI0jPUAHVS7n0ctFJpOuzHuswKTfHc9qOcHuDwn6wIFg%2FqWTonnk61FbHuZdOxm5Ycy2IJZcc2kbcisC60CygpUykKBAE7cllP71MuiuEdPT9WBJOciE2I9jcyVwT7CTbJRGELJ3BPL7fDsAKVJBT3ZfwRUlg8kP6oQw%2FqxD3c%2FpZgCSh0cigQvNsTdpEh3PKX3O30hpc%2FdLxvAbsJBfZNRErTqJ0TQ%2FEBDpZaBxpL6gJVM8VnzmkuKzHZZZkG8gUroaEvIGOChWqyDDrX20N2y1sVGdNBRoTjwrWXSAmcSzkQYEY%2BzWn3pps0Iq7dVkbMgSRiGU%2FotbVkhiLtT%2BaDvoLapR0iNdr2pg8OMss2NgLw%2F8%2B9Fuwsr3hFhidplmMeNPvqEwGsoFHLwEhgRDzxdU5iNINHc2ccoe12NqFvhefdFVGr4C6iLUY9uKm9jCtcDdkqwXxX9Te0QGuWyLGf4S0goKoZmsah2ea0B53ty7iem9s4%2BdEU3y%2FjUd5FxOKk0qYVzYM3ZEk3JXUemxyDBMNbn0a8GOrEBHJtbu5XjCsoLPx2JEHCPGD5Pb7FYrl5iPfHgi21cesk7WU7X4C953BTBwHOWNJsfeS9JWwW%2BaMTnfZAt0KufX1tVgk7ScogiQCDGY7Y7xcyCwcZCjrfhoZw0j6KLFiOldAo9P6up65Qf49ewYoh8%2BP%2B1VSFb%2F%2FtSevQTJ%2BCnVMowRVLgVgi7CLes2tz6AHnSiacqxMSOVMnlLBjwCKQolDFxGGG2%2FVCF5vZzQCbWs8mj&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240315T173311Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFPWEICIA3%2F20240315%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4981e9c96176470b73de13aead2dddcf07302732b57468d7b022b88be1652f52"
                        height="200" width="330" />
                       <div class='action-btn'> <span class="edit" onclick="handleViewItem('${item?.id}')"> <i class="material-icons">&#xe22b;</i></span>
                       <span onclick="handleDeleteItem('${item?.id}')" class="delete">
                      <i class="material-icons ">&#xe872;</i></span>
                      </div>
                    <h4>${item?.name}</h4>
                    <h5>${item?.ingredients?.split(',')?.length} Ingredients</h5>
                    <ul>
                    ${item?.ingredients?.split(',')?.map((ele) => `<li>${ele}</li>`)}
                    </ul>
                </div>`
                })
            }

        }
    })
}

const handleViewItem = (item) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const formData = localData?.filter(({ id }) => id === item)[0]
    document.getElementsByName('name')[0].value = formData?.name;
    document.getElementsByName('id')[0].value = formData?.id;
    document.getElementsByName('ingredients')[0].value = formData?.ingredients
    document.getElementsByName('details')[0].value = formData?.details
    document.getElementsByClassName('title')[0].innerHTML = "Edit"
    addButtonClick('add-modal')
}



const handleEditItem = () => {
    const id = document.getElementsByName('id')[0].value
    const name = document.getElementsByName('name')[0].value
    const ingredients = document.getElementsByName('ingredients')[0].value
    const details = document.getElementsByName('details')[0].value
    if (name && ingredients && details) {
        const localData = JSON.parse(localStorage.getItem("data")) || []
        const index = localData.findIndex(item => item.id === id)
        localData[index]['id'] = id
        localData[index]['name'] = name
        localData[index]['ingredients'] = ingredients
        localData[index]['details'] = details
        localStorage.setItem('data', JSON.stringify(localData))
        alert('Recipe has been added')
        addButtonClick('recipe-page')
    }
}

const handleSubmit = () => {
    const id = document.getElementsByName('title')[0]?.value
    if (id !== "Edit") {
        handleAddItem()
    }
    else {
        handleEditItem()
    }

}

const handleIdChange = () => {
    const id = document.getElementsByName('id')[0].value
    if (!id) {
        const name = document.getElementsByName('name')[0].value
        const localData = JSON.parse(localStorage.getItem("data")) || []
        document.getElementsByName('id')[0].value = `${name?.toLowerCase()?.replace(" ", "-")}${localData.length + 1}`
    }
}

const handleDeleteItem = (id) => {
    const localData = JSON.parse(localStorage.getItem("data")) || []
    const deletedData = localData?.filter((item) => item?.id !== id)
    localStorage.setItem("data", JSON.stringify(deletedData))
    addButtonClick('recipe-page')
}

const handleAddItem = () => {
    const name = document.getElementsByName('name')[0].value
    const ingredients = document.getElementsByName('ingredients')[0].value
    const details = document.getElementsByName('details')[0].value
    if (name && ingredients && details) {
        const localData = JSON.parse(localStorage.getItem("data")) || []
        localData.push({ name, ingredients, details, id: `${name?.toLowerCase()?.replace(" ", "-")}${localData.length + 1}` })
        localStorage.setItem('data', JSON.stringify(localData))
        alert('Recipe has been added')
        addButtonClick('recipe-page')
    }
    else {
        alert('all fields are required!')
    }
}


const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

const handeNextClick = () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
}

const handlePrevClick = () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
}

