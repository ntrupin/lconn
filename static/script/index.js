const search = document.querySelector("#search");
const container = document.querySelector("#posts");
const postTemplate = document.querySelector("#postTemplate").innerText;
const userTemplate = document.querySelector("#userTemplate").innerText;
const errorTemplate = document.querySelector("#errorTemplate").innerText;
const mode = document.querySelector("#mode");
const modeUsers = document.querySelector("#modeUsers");
const modeAlumni = document.querySelector("#modeAlumni");

const getJSON = async (path) => {
    return await fetch(path)
        .then(response => response.json());
}

const renderJSON = (template, data, error = "Unknown error") => {
    return data.length > 0 ? data.reduce((p, d) => p + template.replace(
        /{!\s([^\s]+?)\s!}/g, 
        (_, r) => r == "tags" ? `<small>${d[r].reduce(
            (p, c) => p + `<kbd style="margin-right: 10px;">${c}</kbd>`
            , "")}</small>` : d[r]
    ), "") : errorTemplate.replace(
        /{!\smessage\s!}/,
        error
    );
}

search.addEventListener("keydown", (e) => {
    if (e.keyCode !== 13) { return }
    e.preventDefault();
    const q = e.target.value;
    getJSON(q.length > 0 ? `/search/${mode.getAttribute("data-mode")}/${encodeURIComponent(q)}` : (mode.getAttribute("data-mode") == `alumni` ? `/alumni` : `/posts`)).then(data => {
        container.innerHTML = renderJSON(
            q.length > 0 || mode.getAttribute("data-mode") == "alumni" ? userTemplate : postTemplate, 
            data,
            `No users with tag "${q}" found.`
        )
    });
});

modeUsers.addEventListener("click", (e) => {
    mode.setAttribute("data-mode", "users");
    search.value = "";
    getJSON("/posts").then(data => {
        container.innerHTML = renderJSON(postTemplate, data)
    });
});

modeAlumni.addEventListener("click", (e) => {
    mode.setAttribute("data-mode", "alumni");
    search.value = "";
    getJSON("/alumni").then(data => {
        container.innerHTML = renderJSON(userTemplate, data)
    });
});

getJSON("/posts").then(data => {
    container.innerHTML = renderJSON(postTemplate, data)
});