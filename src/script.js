function changeContent(currentSection) {
    const content = document.getElementById("content");

    if (!content) {
        return;
    }

    content.innerHTML = "";

    const pathObject = paths[currentSection];

    if (!pathObject) {
        return;
    }

    for (const path of pathObject.items) {
        const pathParts = path.split(".");
        const container = document.createElement("div");

        if (pathParts[pathParts.length - 1] !== "pdf") {
            container.innerHTML = `<img src="${path}" />`;
        } else {
            container.innerHTML = `<embed height="100%" width="100%" src="${path}#toolbar=0&page=1&scrollbar=0" type="application/pdf" trusted="yes"></embed>`;
        }

        content.appendChild(container);
    }
}

function createToc() {
    const toc = document.querySelector("#toc");

    if (!toc) {
        return;
    }

    for (const key of Object.keys(paths)) {
        pathObject = paths[key];

        if (!pathObject) {
            continue;
        }

        const listItem = document.createElement("li");
        listItem.innerText = pathObject.name;
        listItem.dataset.selector = key;
        listItem.addEventListener("click", handleClick);
        toc.appendChild(listItem);
    }
}

function handleClick(event) {
    if (!event.target || !event.target.dataset || !event.target.dataset.selector) {
        return;
    }

    const currentSection = event.target.dataset.selector;
    changeContent(currentSection);
}

(function() {
    try {
        changeContent(Object.keys(paths)[0])
        createToc();
    } catch (error) {
        const content = document.getElementById("content");

        if (!content) {
            return;
        }

        content.innerText = "PATHS ARE MISSING! \n" + error.message;
    }
})();