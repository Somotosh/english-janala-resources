const loadLesson =()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=> res.json())
    .then(json=> displayLesson(json.data))
    console.log(res)
    
}
const loadLavelWorld =(id) =>{
    // console.log(id)
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data=> displayLavleWorld(data.data))
}
const displayLavleWorld =(words)=>{
    const wordsCoantainer =document.getElementById("words-container");
    wordsCoantainer.innerHTML=""

    if(words.length == 0){
        wordsCoantainer.innerHTML=` <div class="text-center col-span-full py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-4xl ">নেক্সট Lesson এ যান</h2>
        </div>`
        return
    }
    words.forEach(word => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">${word.meaning}/ ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div> `
        wordsCoantainer.append(card)
    });
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
                         <button onclick="loadLavelWorld(${lesson.level_no})" class="btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
                            </button>

        `
        //      4: appent into container
        laverContainer.append(btnDiv)
    }


    // console.log(lesson)
    
}
loadLesson()