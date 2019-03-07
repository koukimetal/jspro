export const numberComparator = (reverse = false) => (a: number, b: number) => {
    return reverse ? b - a : a - b;
}