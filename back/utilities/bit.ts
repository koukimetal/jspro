
export type ABit = 0 | 1;

// This file is haven't verified.
export class BigBit {
    private bit: Array<ABit>;
    constructor(value: number | string | Array<ABit>) {
        if (typeof value === "number") {
            this.bit = BigBit.stringToBit(value.toString(2));
        } else if (typeof value === "string") {
            let stringBit = value.replace(/^0+/, ''); // 001 -> 1
            if (stringBit.length === 0) {
                stringBit = "0";
            }
            this.bit = BigBit.stringToBit(stringBit);
        } else if (Array.isArray(value)) {
            const lastIndex = value.lastIndexOf(1);
            if (lastIndex < 0) {
                this.bit = [0];
            } else {
                this.bit = value.slice(0, lastIndex + 1);
            }
        }
    }

    private static stringToBit(stringBit: string) {
        const result = new Array<ABit>(stringBit.length);
        for (let i = 0; i < stringBit.length; i++) {
            if (stringBit[i] !== '0' && stringBit[i] !== '1') {
                throw Error(stringBit + " is not bit");
            }
            const bit = stringBit[i] === '0' ? 0 : 1;
            result[stringBit.length - i - 1] = bit;
        }
        return result;
    }

    private static common = (A: BigBit, B: BigBit, operator: (a: ABit, b: ABit) => ABit) => {
        const len = Math.max(A.bit.length, B.bit.length);
        const result = new Array<ABit>(len);
        for (let i = 0; i < len; i++) {
            const a = (i < A.bit.length) ? A.bit[i] : 0;
            const b = (i < B.bit.length) ? B.bit[i] : 0;
            const c = operator(a, b);
            result[i] = c;
        }
        return result;
    }

    or = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: ABit, b: ABit) => (((a | b) as ABit))));
    }

    and = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: ABit, b: ABit) => (((a & b) as ABit))));
    }

    xor = (bit: BigBit) => {
        return new BigBit(BigBit.common(bit, this, (a: ABit, b: ABit) => (((a ^ b) as ABit))));
    }

    getBit = (index: number) => {
        return this.bit[index];
    }

    getHighestZeroIndex = () => {
        if (this.isZero()) {
            return -1;
        } else {
            return this.bit.length - 1;
        }
    }

    isZero = () => {
        return this.bit.length === 1 && this.bit[0] === 0;
    }

    toString = () => {
        const copy = this.bit.slice(0);
        return copy.reverse().join('');
    }

    toNumber = () => {
        let sum = 0;
        for (let i = 0; i < this.bit.length; i++) {
            if (this.bit[i] === 1) {
                sum += Math.pow(2, i);
            }
        }
        return sum;
    }
}
