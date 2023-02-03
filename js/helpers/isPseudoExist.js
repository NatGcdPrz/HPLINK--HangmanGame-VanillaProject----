const isPseudoExist = () => {
    const pseudo = localStorage.getItem('pseudo');
    if (pseudo !== null) {
        return true;
    }

    return false;
}

export { isPseudoExist };