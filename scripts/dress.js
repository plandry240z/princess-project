document.addEventListener("DOMContentLoaded", () => {
    const includedTags = []; /*Step 1: array of tags*/
    const searchInput = document.querySelector("input");

    function createTag(tagName) { /*Step 2*/
        const button = document.createElement("button"); /*Step 2a*/
        button.classList.add("tag"); /*Step 2b*/
        button.textContent = tagName; /*Step 2c: set content as name searched*/

        /*Removing Tags*/
        button.addEventListener("click", () => { /*Step 1*/
            button.remove(); /*Step 1a*/
            const index = includedTags.indexOf(tagName); /*Step 1b*/
            if (index !== -1) {
                includedTags.splice(index, 1);
            }
            hideDresses(); /*Step 1c*/
        });

        return button; /*Step 2d*/
    }

    function hideDresses() { /*Step 3: hide dresses not searched*/
        const dress = document.querySelectorAll(".boxes"); /*defining dresses*/
        if (includedTags.length === 0) { /*Step 3b: empty*/
            dress.forEach(dress => {
                dress.classList.remove("hidden"); /*remove hidden class*/
            });
            return;
        }

        /*Step 3c: includedTags not empty*/
        const includedDresses = []; /*List of found matches*/

        dress.forEach(dress => {
            const tag = dress.querySelectorAll(".tag"); /*defining tag*/
            let count = 0;
            tag.forEach(tag => {
                includedTags.forEach(includedTag => {//comparing
                    const tagWord = tag.textContent.trim().toLowerCase();

                    if (tagWord.includes(includedTag.toLowerCase())) { //count matches
                        count++;
                    }
                });
            });
            if(count===includedTags.length){//display
                includedDresses.push(dress);
            }
        });

        dress.forEach(dress => { /*Step 3d: search to show/hide*/
            if (includedDresses.includes(dress)) { /*found, show*/
                dress.classList.remove("hidden");
            } else {
                dress.classList.add("hidden"); /*found, hide*/
            }
        });
    }

    /*Step 4*/
    const searchedTags = document.querySelector(".searchedTags"); /*getting div from html*/

    function addSearchTerm(searchTerm) { /*Step 4 + a*/
        includedTags.push(searchTerm); /*Step 4b*/
        const tButton = createTag(searchTerm); /*Step 4c*/
        hideDresses(); /*Step 4d*/
        searchedTags.prepend(tButton); /*Step 4e*/
    }

    function initialize() { /*Step 5*/
        const params = new URLSearchParams(window.location.search); /*Step 5a*/
        const tags = params.getAll("tag");
        console.log(tags);

        tags.forEach(tag => { /*Step 5b*/
            const lowerTag = tag.trim().toLowerCase();
            addSearchTerm(lowerTag);
        });
    }

    initialize();

    /*Creating Tags from search inputs*/
    searchInput.addEventListener("keypress", event => { /*Step 1 + a */
        if (event.key === "Enter") { /*Step 1b*/
            const value = searchInput.value.trim().toLowerCase(); /*trim*/
            addSearchTerm(value); /*Step 1bi*/
            searchInput.value = ""; /*Step 1bii*/
        }
    });
});