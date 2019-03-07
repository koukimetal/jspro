import { getFoolIterator, readInput } from "utilities/io";
import { numberComparator } from "utilities/comparator";

(async () => {
    const scanner = getFoolIterator(await readInput());
    const nextInt = () => parseInt(scanner.next().value);

    const N = nextInt();
    const M = nextInt();

    const X = new Array<number>(M);
    for (let i = 0; i < M; i++) {
        X[i] = nextInt();
    }
    X.sort(numberComparator());

    if (M <= N) {
        console.log(0);
        return;
    }

    const Y = new Array<number>(M - 1);
    for (let i = 0; i < Y.length; i++) {
        Y[i] = X[i + 1] - X[i];
    }

    Y.sort(numberComparator(true));
    const ans = Y.slice(N - 1).reduce((ac, cr) => ac + cr, 0);
    console.log(ans);
})()