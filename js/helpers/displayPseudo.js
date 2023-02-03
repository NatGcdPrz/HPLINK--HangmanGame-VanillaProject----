// Display pseudo
const displayPseudo = () => {
    const getPseudo = document.getElementById('pseudo');
    const pseudoFromLocalStorage = localStorage.getItem('pseudo');

    getPseudo.insertAdjacentHTML("afterbegin", pseudoFromLocalStorage);
}

export { displayPseudo };


