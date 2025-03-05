import {DynamicArray} from "./DynamicArray";
import {expect, test} from "@jest/globals";

// const dynamicArray = new DynamicArray(4);
//
// dynamicArray.insert(10);
// dynamicArray.insert(20);
// dynamicArray.insert(30);
// dynamicArray.insert(40);
//
// test("indexOf(10) should return 0", () => {
//     expect(dynamicArray.indexOf(10)).toBe(0);
// })
//
// test("should throw error for non-positive capacity", () => {
//     expect(() => new DynamicArray(-1)).toThrow();
// })

describe("DynamicArray", () => {
    let dynamicArray: DynamicArray;

    beforeEach(() => {
        dynamicArray = new DynamicArray(4);
    })

    describe("Constructor", () => {
        test("should initialize with default capacity", () => {
            const defaultArray = new DynamicArray();

            expect(defaultArray).toBeDefined();
        })

        test("should initialize with custom capacity", () => {
            const defaultArray = new DynamicArray(5);
            expect(defaultArray).toBeDefined();
        })

        test("should throw error for non-positive capacity", () => {
            expect(() => new DynamicArray(0)).toThrow("Capacity must be greater than zero");
            expect(() => new DynamicArray(-5)).toThrow("Capacity must be greater than zero");
        })
    })

    describe("insert", () => {
        beforeEach(() => {
            dynamicArray.insert(10);
            dynamicArray.insert(20);
            dynamicArray.insert(30);
            dynamicArray.insert(40);
        })

        test("should insert values and keep order", () => {
            expect(dynamicArray.indexOf(10)).toBe(0);
            expect(dynamicArray.indexOf(20)).toBe(1);
            expect(dynamicArray.indexOf(30)).toBe(2);
            expect(dynamicArray.indexOf(40)).toBe(3);
        })

        test("should resize array when capacity is exceeded", () => {
            dynamicArray.insert(50);
            expect(dynamicArray.indexOf(50)).toBe(4);
        })
    })

    describe("removeAt", () => {
        test("should remove value at specified index", () => {
            dynamicArray.insert(10);
            dynamicArray.insert(20);
            dynamicArray.insert(30);
            dynamicArray.insert(40);
            dynamicArray.removeAt(0);
            dynamicArray.removeAt(2);
            expect(dynamicArray.indexOf(10)).toBe(-1);
            expect(dynamicArray.indexOf(40)).toBe(-1);
        })

        test("should throw error for invalid index", () => {
            expect(() => dynamicArray.removeAt(-1)).toThrow("Invalid targetIndex");
            expect(() => dynamicArray.removeAt(0)).toThrow("Invalid targetIndex");
        })

        test("should handle edge cases correctly", () => {
            dynamicArray.insert(10);
            dynamicArray.removeAt(0);
            expect(dynamicArray.indexOf(10)).toBe(-1);
        })
    })

    describe("indexOf", () => {
        test("should return correct index for existing value", () => {
            dynamicArray.insert(10);
            dynamicArray.insert(20);
            expect(dynamicArray.indexOf(10)).toBe(0);
            expect(dynamicArray.indexOf(20)).toBe(1);
        })

        test("should return -1 for non-existing value", () => {
            dynamicArray.insert(10);
            expect(dynamicArray.indexOf(99)).toBe(-1);
        })

        test("should handle empty array", () => {
            expect(dynamicArray.indexOf(10)).toBe(-1);
        })
    })
})