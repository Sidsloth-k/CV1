const buttons = document.querySelectorAll('.btn');
const formPages = document.querySelectorAll('.form-page');
const bars = document.querySelectorAll('.bar-circle');   

let pageStates = {
    oldPageNum: null,
    currentPage: 0,
}

const pageTransform = () => 
{
    formPages.forEach(page => {        
        page.addEventListener('transitionend', () => {
            page.style.transform = `translateX(-${(pageStates.currentPage) * 100}%)`
        }, {once: true})
        page.style.transform = `translateX(-${(pageStates.currentPage) * 100}%)`
    })
}


const handleClasses = () => 
{     

    bars.forEach(bar => {
        bar.classList.remove('active')
    })

    if(bars[pageStates.currentPage]) {
        for(let i = 0; i < pageStates.currentPage + 1; i++) {
            bars[i].classList.add('active')
        }
    } else {
        bars.forEach(bar => {
            bar.classList.add('active')
            bar.classList.add('done')
        })
    }
}

const indexFinder = (el) => {    
    let i = 0;
    for(; el = el.previousElementSibling; i++);
    return i;
}

const pageHandler = (e) => {
    e.preventDefault()

    const navData = e.currentTarget.getAttribute('data-nav')
    pageStates.oldPageNum = indexFinder(e.currentTarget.parentElement)
    
    if(navData == "prev") {
        pageStates.currentPage = pageStates.oldPageNum - 1
    } else {
        pageStates.currentPage = pageStates.oldPageNum + 1
    }    

    pageTransform()
    handleClasses()
}


const barHandler = (e) => {
    e.preventDefault()
    pageStates.currentPage = indexFinder(e.currentTarget)

    pageTransform()
    handleClasses()
}

buttons.forEach(button => {
    button.addEventListener('click', pageHandler)
})

bars.forEach(bar => {
    bar.addEventListener('click', barHandler)
})


