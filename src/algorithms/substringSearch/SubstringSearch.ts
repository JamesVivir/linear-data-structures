export class SubstringSearch {
    public boyerMooreSearch(str: string, pattern: string) {
        if (!str || !pattern) return -1;
        if (pattern.length === 0) return 0;
        if (str.length < pattern.length) return -1;

        const charTable = this.computeTable(pattern);
        const patternLength = pattern.length;
        const strLength = str.length;

        let skipNumber: number;
        for (let i = 0; i <= strLength - patternLength; i += skipNumber) {
            skipNumber = 0;

            for (let j = patternLength - 1; j >= 0; j--) {
                if (str[i + j] !== pattern[j]) {
                    skipNumber = charTable.get(str[i + j]) || patternLength;
                    break;
                }
            }

            if (skipNumber === 0) return i;
        }

        return -1;
    }

    private computeTable(pattern: string) {
        const charTable: Map<string, number> = new Map();
        const patternLength = pattern.length;

        for (let i = 0; i < patternLength; i++) {
            charTable.set(pattern[i], Math.max(1, patternLength - i - 1));
        }

        return charTable;
    }
}