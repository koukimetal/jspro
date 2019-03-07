export const binarySearch = (lb: number, ub: number, feasible: (md: number) => boolean) => {
    while (ub - lb > 1) {
        const md = Math.floor((lb + ub) / 2);
        if (feasible(md)) {
            ub = md;
        } else {
            lb = md;
        }
    }
    return {lb, ub};
}