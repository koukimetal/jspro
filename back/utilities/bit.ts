
type Bit = '0' | '1';

// This file is haven't verified.
export class BigBit {
    bit: Array<Bit>;
    constructor(value: number | string | Array<Bit>) {
        if (typeof value === "number") {
            this.bit = BigBit.stringToBit(value.toString(2));
        } else if (typeof value === "string") {
            let stringBit = value.replace(/^0+/, ''); // 001 -> 1
            if (stringBit.length === 0) {
                stringBit = "0";
            }
            this.bit = BigBit.stringToBit(stringBit);
        } else if (Array.isArray(value)) {
            const lastIndex = value.lastIndexOf('1');
            if (lastIndex < 0) {
                this.bit = ['0'];
            } else {
                this.bit = value.slice(0, lastIndex + 1);
            }
        }
    }

    private static isBit(x: string): x is Bit {
        return x === '0' || x === '1';
    }

    private static stringToBit(bit: string) {
        const result = new Array<Bit>(bit.length);
        for (let i = 0; i < bit.length; i++) {
            const a = bit[i];
            if (!BigBit.isBit(a)) {
                throw Error(bit + " is not bit");
            }
            result[i] = a;
        }
        return result;
    }

    private static common = (A: BigBit, B: BigBit, operator: (a: Bit, b: Bit) => Bit) => {
        const len = Math.max(A.bit.length, B.bit.length);
        const result = new Array<Bit>(len);
        for (let i = 0; i < len; i++) {
            const a = (i < A.bit.length) ? A.bit[i] : '0';
            const b = (i < B.bit.length) ? B.bit[i] : '0';
            const c = operator(a, b);
            result[len - i - 1] = c;
        }
        return result;
    }

    or = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: Bit, b: Bit) => (a === '1' || b === '1') ? '1': '0'));
    }

    and = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: Bit, b: Bit) => (a === '1' && b === '1') ? '1': '0'));
    }

    xor = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: Bit, b: Bit) => ((a === '1' && b === '0') || (a === '0' && b === '1')) ? '1': '0'));
    }

    toString = () => {
        const copy = this.bit.slice(0);
        return copy.reverse().join('');
    }

    toNumber = () => {
        let sum = 0;
        for (let i = 0; i < this.bit.length; i++) {
            if (this.bit[i] === '1') {
                sum += Math.pow(2, i);
            }
        }
        return sum;
    }
}
