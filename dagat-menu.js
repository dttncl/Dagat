// MENU PAGE


// FUNCTION TO OPEN TABBED MENU
function openMenu(event, mnuItem) {
    let i, tabContent;
    tabContent = document.getElementsByClassName("tabContent");

    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tabLink = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "");
    }

    document.getElementById(mnuItem).style.display = "block";
    event.currentTarget.className += " active";
}


// OPEN A TAB MENU BY DEFAULT
document.querySelector("#defaultOpen").click();


// FUNCTION TO LOAD THE MENU CONTENT
loadMenu();
function loadMenu() {

    // array of images
    const arrAppImgs = ["crispy-smelt-fish.jpg", "drunk-shrimp.jpg", "grilled-squid.jpg", "catfish-adobo.jpg"];
    const arrSpcImgs = ["coconut-crab.jpg", "creamy-baked-mussels.jpg", "dinakdakan.jpg", "pork-belly-lechon.jpg"];
    const arrPltImgs = ["bulalo.jpg", "fried-rice.jpg", "pancit-malabon.jpg", "paella.jpg"];
    const arrDesImgs = ["ice-cream.jpg", "pastillas.jpg", "pichi-pichi.jpg", "coffee-jelly.jpg"];
    const arrSalImgs = ["mango-tomato.jpg", "ensalada.jpg", "buko-salad.jpg", "macaroni.jpg"];
    const arrDnkImgs = ["lime-juice.jpg", "ginger-tea.jpg", "melon-juice.jpg", "buko-shake.png"];

    // array of items in menu classes
    const appItem = document.querySelectorAll(".app-item");
    const spcItem = document.querySelectorAll(".spc-item");
    const pltItem = document.querySelectorAll(".plt-item");
    const desItem = document.querySelectorAll(".des-item");
    const salItem = document.querySelectorAll(".sal-item");
    const dnkItem = document.querySelectorAll(".dnk-item");

    // load the app imgs by default
    for (let i = 0; i < appItem.length; i++) {
        appItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrAppImgs[i]})`);
    }

    // add to cart function for appetizers
    let arrMenuBtns = document.querySelectorAll(`.app-item > button.add-cart`);
    manageCart(arrMenuBtns);

    // load the specials imgs on click
    document.querySelector(".tab > button:nth-child(2)").addEventListener("click", () => {
        for (let i = 0; i < spcItem.length; i++) {
            spcItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrSpcImgs[i]})`);
        }

        // add to cart function for specials
        let arrMenuBtns = document.querySelectorAll(`.spc-item > button.add-cart`);
        manageCart(arrMenuBtns);
    });

    // load the platter imgs on click
    document.querySelector(".tab > button:nth-child(3)").addEventListener("click", () => {
        for (let i = 0; i < pltItem.length; i++) {
            pltItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrPltImgs[i]})`);
        }

        // add to cart function for platters
        let arrMenuBtns = document.querySelectorAll(`.plt-item > button.add-cart`);
        manageCart(arrMenuBtns);
    });

    // load the desserts imgs on click
    document.querySelector(".tab > button:nth-child(4)").addEventListener("click", () => {
        for (let i = 0; i < desItem.length; i++) {
            desItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrDesImgs[i]})`);
        }

        // add to cart function for desserts
        let arrMenuBtns = document.querySelectorAll(`.des-item > button.add-cart`);
        manageCart(arrMenuBtns);
    });

    // load the salad imgs on click
    document.querySelector(".tab > button:nth-child(5)").addEventListener("click", () => {
        for (let i = 0; i < salItem.length; i++) {
            salItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrSalImgs[i]})`);
        }

        // add to cart function for platters
        let arrMenuBtns = document.querySelectorAll(`.sal-item > button.add-cart`);
        manageCart(arrMenuBtns);
    });

    document.querySelector(".tab > button:nth-child(6)").addEventListener("click", () => {
        for (let i = 0; i < dnkItem.length; i++) {
            dnkItem[i].style.setProperty("--menuItemBackground", `url(menu-img/${arrDnkImgs[i]})`);
        }

        // add to cart function for drinks
        let arrMenuBtns = document.querySelectorAll(`.dnk-item > button.add-cart`);
        manageCart(arrMenuBtns);
    });
}
