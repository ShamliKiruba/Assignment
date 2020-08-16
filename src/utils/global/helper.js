export const changeRoute = (history, route, params) => {
    history.push({
        pathname: `/${route}`,
        search: params,
    });
};

export const getImage = (html) => {
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    content.innerHTML = html;
    const img = content.querySelectorAll('figure img')[0]
    return img ? img.getAttribute('src') : '';
};

export const getDate = (date) => {
    return new Date(date).toString().substring(4,15);
}