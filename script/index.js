const loadLesson =()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=> res.json())
    .then(json=> displayLesson(json.data))
    console.log(res)
    
}
const displayLesson =(lessons) =>{
    // 1: get the container & empty
    const laverContainer = document.getElementById("lavel-container");
    laverContainer.innerHTML=""
    // 2:get into every lesson
    for(let lesson of lessons){
        // console.log(lesson)
        //      3: create Element
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML=`
                         <button class="btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
                            </button>

        `
        //      4: appent into container
        laverContainer.append(btnDiv)
    }


    // console.log(lesson)
    
}
loadLesson()