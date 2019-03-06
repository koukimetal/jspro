export class PriorityQueue<T> {
    private v: Array<T>;
    private n: number;
    private compare: (a: number, b: number) => number;
    private capacity: number;
    constructor(capacity: number, comparator: (a: T, b: T) => number) {
        this.capacity = capacity;
        this.v = new Array(capacity);
        this.n = 0;
        this.compare = (a: number, b: number) => {
            if (a >= this.n && b >= this.n) {
                return 0;
            } else if (a >= this.n) {
                return 1;
            } else if (b >= this.n) {
                return -1;
            } else {
                return comparator(this.v[a], this.v[b]);
            }
        }
    }

    private swap(a: number, b: number) {
        const tmp = this.v[a];
        this.v[a] = this.v[b];
        this.v[b] = tmp;
    }

    // if all values are same, it should return first argument.
    private minIndex(...idxs: Array<number>) {
        return idxs.reduce((ia: number, ib: number) => this.compare(ia, ib) > 0 ? ib : ia, idxs[0]);         
    }

    private rotate = (idx: number, skipParent = false, skipChildren = false) => {
        const parent = Math.floor((idx - 1) / 2);
        if (!skipParent && parent >= 0 && this.compare(parent, idx) > 0) {
            this.swap(parent, idx);
            this.rotate(parent, false, true);
            return;
        }

        if (skipChildren) {
            return;
        }

        const lidx = (idx * 2) + 1;
        const ridx = (idx * 2) + 2;
        const midx = this.minIndex(idx, lidx, ridx);

        if (lidx === midx) {
            this.swap(lidx, idx);
            this.rotate(lidx, true);
        } else if (ridx === midx) {
            this.swap(ridx, idx);
            this.rotate(ridx, true);
        }
    }

    push = (a: T) => {
        const idx = this.n;
        this.n++;
        this.v[idx] = a;
        this.rotate(idx);
    }

    pop = () => {
        if (this.isEmpty()) {
            throw Error('Heap is empty');
        }
        const resp = this.v[0];
        this.swap(0, this.n - 1);
        this.v[this.n - 1] = undefined;
        this.n--;
        this.rotate(0);
        return resp;
    }

    peek = () => {
        if (this.isEmpty()) {
            throw Error('Heap is empty');
        }
        return this.v[0];
    }

    isEmpty = () => {
        return !this.n;
    }

    size = () => {
        return this.n;
    }

    showHeap = () => {
        for (let i = 1; i - 1 < this.n; i *= 2) {
            console.log(this.v.slice(i - 1, Math.min(this.capacity, (i * 2) - 1)));
        }
    }
}
