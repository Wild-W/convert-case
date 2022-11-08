import { AssertionError } from "assert";
import { CS, Case, Boundary, Pattern } from "../main";

//#region toCase
test("'toBe_or not-to-BE' in camelCase to be 'toBeOrNotToBe'", () => {
    expect(CS("toBe_or not-to-BE").toCase(Case.Camel).toString()).toBe("toBeOrNotToBe");
});

test("'SCREAMING_SNAKE' in aLtErNaTiNg CaSe to be 'sCrEaMiNg SnAkE'", () => {
    expect(CS("SCREAMING_SNAKE").toCase(Case.Alternating).toString()).toBe("sCrEaMiNg SnAkE");
});

test("'hello-world' in rANDOm CasE to not be 'hello-world' (hypthon will be replaced by space)", () => {
    expect(CS("hello-world").toCase(Case.Random).toString()).not.toBe("hello-world");
});

test("'a   very -__strangeCombination-INDEED' in PascalCase in snake_case (double conversion) to be 'a_very_strange_combination_indeed'", () => {
    expect(CS("a   very -__strangeCombination-INDEED").toCase(Case.Pascal).toCase(Case.Snake).toString()).toBe("a_very_strange_combination_indeed");
});

test("'SpamAndEggs' (toCase) using caseType = 77 (an invalid value) to throw an assertion error", () => {
    expect(() => CS("SpamAndEggs").toCase(77)).toThrow(AssertionError);
});

test("'toBe_or not-to-BE' in COBOL-CASE from kebab-case to be 'TOBE_OR NOT-TO-BE'", () => {
    expect(CS("toBe_or not-to-BE").toCase(Case.Cobol, Case.Kebab).toString()).toBe("TOBE_OR NOT-TO-BE");
});
//#endregion

//#region isCase
test("'Choo-Choo' is Train-Case", () => {
    expect(CS("Choo-Choo").isCase(Case.Train)).toBe(true);
});

test("'gentle_snek' is not lowercase (because the underscore delimiter denotes snake_case)", () => {
    expect(CS("gentle_snek").isCase(Case.Lower)).toBe(false);
});

test("'fooBar' (isCase) using caseType = -9 (an invalid value) to throw an assertion error", () => {
    expect(() => CS("fooBar").isCase(-9)).toThrow(AssertionError);
});
//#endregion

//#region mutate
test("'567N9854G321K' mutated using boundaries = [Boundary.UpperDigit], delim = '-' to be '567N-9854G-321K'", () => {
    expect(CS("567N9854G321K").mutate({boundaries: [Boundary.UpperDigit], delim: "-"}).toString()).toBe("567N-9854G-321K");
});

test("'thatIsTheQuestion' mutated using boundaries = Boundary.defaults(), delim = '_', pattern = Pattern.Capital to be 'That_Is_The_Question'", () => {
    expect(CS("thatIsTheQuestion").mutate({boundaries: Boundary.defaults(), delim: "_", pattern: Pattern.Capital}).toString()).toBe("That_Is_The_Question");
});
//#endregion

//#region Boundary
test("Boundary.listFrom('aB:Ba:_: ') to be an array including [Boundary.LowerUpper, Boundary.UpperLower, Boundary.Underscore, Boundary.Space]", () => {
    expect(Boundary.listFrom("aB:Ba:_: ").sort()).toEqual([Boundary.LowerUpper, Boundary.UpperLower, Boundary.Underscore, Boundary.Space].sort());
});

test("Boundary.listFrom('helloWorld_HELLO me') to be an array including [Boundary.DigitLower, Boundary.UpperDigit, Boundary.LowerUpper, Boundary.Underscore, Boundary.Space]", () => {
    expect(Boundary.listFrom("helloW1orld_HELLO me").sort()).toEqual([Boundary.DigitLower, Boundary.UpperDigit, Boundary.LowerUpper, Boundary.Underscore, Boundary.Space].sort());
});
//#endregion

//#region Case
test("Pattern of Case.ScreamingSnake to be Pattern.Uppercase", () => {
    expect(Case.pattern(Case.ScreamingSnake)).toBe(Pattern.Uppercase);
});

test("Delim of Case.ScreamingSnake to be '_'", () => {
    expect(Case.delim(Case.ScreamingSnake)).toBe("_");
});
//#endregion