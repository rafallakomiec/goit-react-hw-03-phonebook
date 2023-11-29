const loadFromLocalStorage = key => {
    try {
        const serialized = localStorage.getItem(key);
        return serialized === null ? undefined : JSON.parse(serialized)
    } catch (error) {
        alert(`An error occured: ${error}. Please reload the page.`);
    }
}

const saveToLocalStorage = (key, items) => {
    try {
        const serialized = JSON.stringify(items);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        alert(`An error occured: ${error}. Please reload the page.`);
        return false;
    }
}

export default {load: loadFromLocalStorage, save: saveToLocalStorage};