// hàm cắt chuỗi
export const cutStrings = (str, length) => {
    return str?.length > length ? str.substr(0, length - 1) + "..." : str;
};