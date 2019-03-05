export class UnionFind {
    v: Array<number>;
    constructor(n: number) {
        this.v = new Array(n);
        this.v.fill(-1);
    }

    union(a: number, b: number) {
        if (!this.find(a, b)) {
            const ra = this.root(a);
            const rb = this.root(b);

            if (this.size(ra) > this.size(rb)) {
                this.v[ra] += this.v[rb];
                this.v[rb] = ra;
            } else {
                this.v[rb] += this.v[ra];
                this.v[ra] = rb;
            }
        }
    }

    find(a: number, b: number) {
        return this.root(a) === this.root(b);
    }

    root(a: number) {
        if (this.v[a] < 0) {
            return a;
        }
        this.v[a] = this.root(this.v[a]);
        return this.v[a];
    }

    size(a: number) {
        return -this.v[this.root(a)];
    }
}