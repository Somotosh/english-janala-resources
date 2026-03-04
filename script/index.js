const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
   return htmlElements.join(" ")
}
const manageSpinner =(status) =>{
  if(status== true){
    document.getElementById('spinner').classList.remove("hidden")
    document.getElementById('words-container').classList.add("hidden")
  }else{
      document.getElementById('words-container').classList.remove("hidden")
    document.getElementById('spinner').classList.add("hidden")
  }
}
const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLesson(json.data))
    // console.log(res)

}
const removeAtive = () => {
    const activeButton = document.querySelectorAll(".lesson-btn");
    activeButton.forEach(btn => btn.classList.remove("active"))
    // console.log(activeButton)
}
const loadLavelWorld = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeAtive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            // console.log(clickBtn);
            displayLavleWorld(data.data)

        })
}
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    //   console.log(url)
    const res = await fetch(url);
    const deltails = await res.json()
     displayWorldDeltails(deltails.data)
}
const displayWorldDeltails = (word) => {
    console.log(word)
    const deltailsBox = document.getElementById("deltails-container")
    deltailsBox.innerHTML = `
                <div>
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class=" font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class=" font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
                   <div>${createElements(word.synonyms)}</div>
                </div>`

    document.getElementById("word_modal").showModal();

}
const displayLavleWorld = (words) => {
    const wordsCoantainer = document.getElementById("words-container");
    wordsCoantainer.innerHTML = ""

    if (words.length == 0) {
        wordsCoantainer.innerHTML = ` <div class="text-center col-span-full py-10 space-y-6">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-4xl ">নেক্সট Lesson এ যান</h2>
        </div>`
        manageSpinner(false)
        return
    }
    words.forEach(word => {
        // console.log(word)
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "prounciation পাওয়া যায়নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div> `
        wordsCoantainer.append(card)
    });
    manageSpinner(false);
}
const displayLesson = (lessons) => {
    // 1: get the container & empty
    const laverContainer = document.getElementById("lavel-container");
    laverContainer.innerHTML = ""
    // 2:get into every lesson
    for (let lesson of lessons) {
        // console.log(lesson)
        //      3: create Element
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
                         <button id="lesson-btn-${lesson.level_no}" 
                         onclick="loadLavelWorld(${lesson.level_no})" 
                         class="btn btn-outline btn-primary lesson-btn">
                            <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
                            </button>

        `
        //      4: appent into container
        laverContainer.append(btnDiv)
    }

}
loadLesson()