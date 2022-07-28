function main_list_films() {
    let obj_of_fims = {
      johnWick: {
        id: 1,
        personages: [
            "Keanu Reeves",
            "Lance Reddick",
            "Derek Kolstad",
            "Boban Marjanovic",
            "Ian McShane",
          ],
        date: "December 11, 2014",
        title: "John Wick",
        description: `The story focuses on John Wick (Reeves) searching for the men who 
        broke into his home, stole his vintage car and killed his puppy, which was a 
        last gift to him from his recently deceased wife. Chad Stahelski and David 
        Leitch directed the film together, though only Stahelski was credited. 
        Kolstad had completed the screenplay in 2012 and further developed it 
        for Thunder Road Pictures. `,
        poster: "assets/images/John_wick.jpg",
        
      },
      endgame: {
        id: 2,
        personages: [
            "Robert Downey Jr.",
            "Chris Evans",
            "Ian McShane",
            "Chris Hemsworth",
            "Scarlett Johansson",
          ],
        date: "April 22, 2019",
        title: "Avengers: Endgame",
        description: `Avengers: Endgame premiered in Los Angeles on April 22, 2019, 
        and was released in the United States on April 26, as part of 
        Phase Three of the MCU. The film received praise for its direction, 
        acting, musical score, action sequences, visual effects, and emotional 
        weight, with critics lauding its culmination of the 22-film story.`,
        poster: "assets/images/avengeres.jpg",
      },
      inception: {
        id: 3,
        personages: [
            "Leonardo DiCaprio",
            "Cillian Murphy",
            "Joseph Gordon-Levitt",
            "Marion Cotillard",
            "Tom Hardy",
          ],
        date: "July 22, 2010",
        title: "Inception",
        description: `After the 2002 completion of Insomnia, Nolan presented to Warner Bros. 
        a written 80-page treatment for a horror film envisioning "dream stealers," 
        based on lucid dreaming. Deciding he needed more experience before tackling 
        a production of this magnitude and complexity, Nolan shelved the project and 
        instead worked on 2005's Batman Begins, 2006's The Prestige, and The Dark 
        Knight in 2008. The treatment was revised over 6 months and was purchased by 
        Warner in February 2009. Inception was filmed in six countries, beginning 
        in Tokyo on June 19 and ending in Canada on November 22.`,
        poster: "assets/images/inception.jpg",
      }
    };
    let name_of_film = document.getElementsByClassName("name");
    let central_container = document.getElementsByClassName("central_container")[0];
    let id;
    for (let name of name_of_film) {
        name.addEventListener("click", () => {
            for (let attribute of name_of_film) {
                attribute.removeAttribute("id");
            }
            name.setAttribute("id", "active");
            id = name.getAttribute("data-id");
            for (film in obj_of_fims) {
                let current_id = obj_of_fims[film].id;
                if (id == current_id ) {
                    central_container.innerHTML = `
                        <div class="text">
                            <div class="title">${obj_of_fims[film].title}</div>
                            <div class="date">${obj_of_fims[film].date}</div>
                            <div class="personages">
                            <div class="personages">
                                <div class="actor">${obj_of_fims[film].personages[0]}</div>
                                <div class="actor">${obj_of_fims[film].personages[1]}</div>
                                <div class="actor">${obj_of_fims[film].personages[2]}</div>
                                <div class="actor">${obj_of_fims[film].personages[3]}</div>
                                <div class="actor">${obj_of_fims[film].personages[4]}</div>
                            </div>
                        </div>
                    <div class="description">${obj_of_fims[film].description}
                    </div>
                    </div>
                    <img src="${obj_of_fims[film].poster}" alt="poster" class="poster">`;
                }
            }
        });
    }
}
  
main_list_films();