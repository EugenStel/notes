export const setCaret = (elem: any) => {
    if (elem.hasAttribute('contenteditable')) {
        let [range, selection]: any = [document.createRange(), window.getSelection()];
        range.selectNodeContents(elem);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}