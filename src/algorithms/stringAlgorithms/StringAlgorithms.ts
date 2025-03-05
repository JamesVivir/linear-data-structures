export class StringAlgorithms {
    public areAnagrams(str1: string, str2: string) {
        const charCountMap: Record<string, number> = {};

        if (str1.length !== str2.length) {
            return false;
        }

        for (let ch of str1) {
            charCountMap[ch] = (charCountMap[ch] || 0) + 1
        }

        for (let ch of str2) {
            if (!charCountMap[ch]) {
                return false;
            }

            charCountMap[ch] = charCountMap[ch] - 1;
        }

        return true;
    }

    public firstNonRepeatedCharacter(str: string) {
        if (!str) return null;

        const charCountMap: Record<string, number> = {};

        for (let char of str) {
            charCountMap[char] = (charCountMap[char] || 0) + 1;
        }

        for (let char of str) {
            if (charCountMap[char] === 1) {
                return char;
            }
        }

        return null;
    }

    public isBalanced(str: string) {
        const openBrackets = ['(', '{', '[', '<'];
        const closeBrackets = [')', '}', ']', '>'];
        const stack: string[] = [];

        for (const ch of str) {
            if (openBrackets.includes(ch)) {
                stack.push(ch);
            } else if (closeBrackets.includes(ch)) {
                if (stack.length === 0) {
                    return false;
                }

                const topBracket = stack.pop()!;
                if (openBrackets.indexOf(topBracket) !== closeBrackets.indexOf(ch)) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }

    public isBalanced2(str: string) {
        const brackets: Record<string, string> = {
            ')': '(',
            '}': '{',
            ']': '[',
            '>': '<'
        }

        const stack: string[] = [];

        for (const ch of str) {
            if (Object.values(brackets).includes(ch)) {
                stack.push(ch);
            } else if (brackets[ch]) {
                if (stack.pop() !== brackets[ch]) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }
}