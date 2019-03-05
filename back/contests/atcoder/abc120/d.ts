import { UnionFind } from 'utilities/unionfind';
import { readInput, getFoolIterator } from "utilities/io";

(async () => {
    const allInput = await readInput();
    const interator = getFoolIterator(allInput);
    const nextInt = () => parseInt(interator.next().value);

    const N = nextInt();
    const M = nextInt();
    const ans = new Array<number>(M);
    const uf = new UnionFind(N);
    const bridges = new Array<{a: number, b: number}>(M);

    for (let i = 0; i < M; i++) {
        const a = nextInt() - 1;
        const b = nextInt() - 1;
        bridges[i] = {a, b};
    }

    let fuben = N * (N - 1); // this is shorter than inconveniency
    for (let i = M - 1; i >= 0; i--) {
        ans[i] = Math.floor(fuben / 2); //inconvenient :(
        const {a, b} = bridges[i];
        if (!uf.find(a, b)) {
            const sa = uf.size(a);
            const sb = uf.size(b);
            const sc = sa + sb;
            fuben = fuben - (sa * (N - sa) + sb * (N - sb)) + (sc * (N - sc));
            uf.union(a, b);
        }
    }
    ans.forEach(a => console.log(a));
})()