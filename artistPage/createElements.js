function createElements(type, {className= null, text= null, src=null}) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerHTML = text;
    element.src = src
    console.log(element.src)

    return element;
}

export {createElements}