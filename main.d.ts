/**
 * Defines the type of casing a string can be.
 *
 * ```
 * let superMarioTitle: string = CS("super_mario_64").toCase(Case.Title).toString();
 * assert("Super Mario 64" === superMarioTitle);
 * ```
 *
 * A case is the pair of a {@link Pattern pattern} and a delimeter (a string).  Given
 * a list of words, a pattern describes how to mutate the words and a delimeter is how the mutated
 * words are joined together.  These inherantly are the properties of what makes a "multiword
 * identifier case", or simply "case".
 *
 * This package provides the ability to convert "from" a case.  This introduces a different feature
 * of cases which are the {@link Boundary word boundaries} that segment the identifier into words.  For example, a
 * snake case identifier `my_var_name` can be split on underscores `_` to segment into words.  A
 * camel case identifier `myVarName` is split where a lowercase letter is followed by an
 * uppercase letter.  Each case is also associated with a list of boundaries that are used when
 * converting "from" a particular case.
 */
declare enum Case {
    /**
     * Uppercase strings are delimited by spaces and all characters are uppercase.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Uppercase Uppercase}
     * * Delimeter: Space
     *
     * ```
     * assert("MY VARIABLE NAME" === CS("My variable NAME").toCase(Case.Upper).toString());
     * ```
     */
    Upper = 0,
    /**
     * Lowercase strings are delimited by spaces and all characters are lowercase.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Lowercase Lowercase}
     * * Delimeter: Space
     *
     * ```
     * assert("my variable name" === CS("My variable NAME").toCase(Case.Lower).toString());
     * ```
     */
    Lower = 1,
    /**
     * Title case strings are delimited by spaces. Only the leading character of
     * each word is uppercase.  No inferences are made about language, so words
     * like "as", "to", and "for" will still be capitalized.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Capital Capital}
     * * Delimeter: Space
     *
     * ```
     * assert("My Variable Name" === CS("My variable NAME").toCase(Case.Title).toString());
     * ```
     */
    Title = 2,
    /**
     * Toggle case strings are delimited by spaces.  All characters are uppercase except
     * for the leading character of each word, which is lowercase.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Toggle Toggle}
     * * Delimeter: Space
     *
     * ```
     * assert("mY vARIABLE nAME" === CS("My variable NAME").toCase(Case.Toggle).toString());
     * ```
     */
    Toggle = 3,
    /**
     * Camel case strings are lowercase, but for every word _except the first_ the
     * first letter is capitalized.
     * * Boundaries: {@link Boundary.LowerUpper LowerUpper}, {@link Boundary.DigitUpper DigitUpper},
     * {@link Boundary.UpperDigit UpperDigit}, {@link Boundary.DigitLower DigitLower},
     * {@link Boundary.LowerDigit LowerDigit}, {@link Boundary.Acronym Acronym}
     * * Pattern: {@link Pattern.Camel Camel}
     * * Delimeter: No delimeter
     *
     * ```
     * assert("myVariableName" === CS("My variable NAME").toCase(Case.Camel).toString());
     * ```
     */
    Camel = 4,
    /**
     * Pascal case strings are lowercase, but for every word the
     * first letter is capitalized.
     * * Boundaries: {@link Boundary.LowerUpper LowerUpper}, {@link Boundary.DigitUpper DigitUpper},
     * {@link Boundary.UpperDigit UpperDigit}, {@link Boundary.DigitLower DigitLower},
     * {@link Boundary.LowerDigit LowerDigit}, {@link Boundary.Acronym Acronym}
     * * Pattern: {@link Pattern.Capital Capital}
     * * Delimeter: No delimeter
     *
     * ```
     * assert("MyVariableName" === CS("My variable NAME").toCase(Case.Pascal).toString());
     * ```
     */
    Pascal = 5,
    /** Upper camel case is an alternative name for {@link Case.Pascal Pascal case}. */
    UpperCamel = 6,
    /**
     * Snake case strings are delimited by underscores `_` and are all lowercase.
     * * Boundaries: {@link Boundary.Underscore Underscore}
     * * Pattern: {@link Pattern.Lowercase Lowercase}
     * * Delimeter: Underscore `_`
     *
     * ```
     * assert("my_variable_name" === CS("My variable NAME").toCase(Case.Snake).toString());
     * ```
     */
    Snake = 7,
    /**
     * Upper snake case strings are delimited by underscores `_` and are all uppercase.
     * * Boundaries: {@link Boundary.Underscore Underscore}
     * * Pattern: {@link Pattern.Uppercase Uppercase}
     * * Delimeter: Underscore `_`
     *
     * ```
     * assert("MY_VARIABLE_NAME" === CS("My variable NAME").toCase(Case.UpperSnake).toString());
     * ```
     */
    UpperSnake = 8,
    /** Screaming snake case is an alternative name for {@link Case.UpperSnake upper snake case}. */
    ScreamingSnake = 9,
    /**
     * Kebab case strings are delimited by hyphens `-` and are all lowercase.
     * * Boundaries: {@link Boundary.Hyphen Hyphen}
     * * Pattern: {@link Pattern.Lowercase Lowercase}
     * * Delimeter: Hyphen `-`
     *
     * ```
     * assert("my-variable-name" === CS("My variable NAME").toCase(Case.Kebab).toString());
     * ```
     */
    Kebab = 10,
    /**
     * Cobol case strings are delimited by hyphens `-` and are all uppercase.
     * * Boundaries: {@link Boundary.Hyphen Hyphen}
     * * Pattern: {@link Pattern.Uppercase Uppercase}
     * * Delimeter: Hyphen `-`
     *
     * ```
     * assert("MY-VARIABLE-NAME" === CS("My variable NAME").toCase(Case.Cobol).toString());
     * ```
     */
    Cobol = 11,
    /** Upper kebab case is an alternative name for {@link Case.Cobol Cobol case}. */
    UpperKebab = 12,
    /**
     * Train case strings are delimited by hyphens `-`.  All characters are lowercase
     * except for the leading character of each word.
     * * Boundaries: {@link Boundary.Hyphen Hyphen}
     * * Pattern: {@link Pattern.Capital Capital}
     * * Delimeter: Hyphen `-`
     *
     * ```
     * assert("My-Variable-Name" === CS("My variable NAME").toCase(Case.Train).toString());
     * ```
     */
    Train = 13,
    /**
     * Flat case strings are all lowercase, with no delimiter. Note that word boundaries are lost.
     * * Boundaries: No boundaries
     * * Pattern: {@link Pattern.Lowercase Lowercase}
     * * Delimeter: No delimeter
     *
     * ```
     * assert("myvariablename" === CS("My variable NAME").toCase(Case.Flat).toString());
     * ```
     */
    Flat = 14,
    /**
     * Upper flat case strings are all uppercase, with no delimiter. Note that word boundaries are lost.
     * * Boundaries: No boundaries
     * * Pattern: {@link Pattern.Uppercase Uppercase}
     * * Delimeter: No delimeter
     *
     * ```
     * assert("MYVARIABLENAME" === CS("My variable NAME").toCase(Case.UpperFlat).toString());
     * ```
     */
    UpperFlat = 15,
    /**
     * Alternating case strings are delimited by spaces.  Characters alternate between uppercase
     * and lowercase.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Alternating Alternating}
     * * Delimeter: Space
     *
     * ```
     * assert("mY vArIaBlE nAmE" === CS("My variable NAME").toCase(Case.Alternating).toString());
     * ```
     */
    Alternating = 16,
    /**
     * Random case strings are delimited by spaces and characters are
     * randomly upper case or lower case.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.Random Random}
     * * Delimeter: Space
     *
     * ```
     * let new = CS("My variable NAME").toCase(Case.Random).toString();
     * ```
     * String `new` could be "My vaRIAbLE nAme" for example.
     */
    Random = 17,
    /**
     * Pseudo-random case strings are delimited by spaces and characters are randomly
     * upper case or lower case, but there will never more than two consecutive lower
     * case or upper case letters in a row.
     * * Boundaries: {@link Boundary.Space Space}
     * * Pattern: {@link Pattern.PseudoRandom PseudoRandom}
     * * Delimeter: Space
     *
     * ```
     * let new = CS("My variable NAME").toCase(Case.Random).toString();
     * ```
     * String `new` could be "mY vArIAblE NamE" for example.
     */
    PseudoRandom = 18
}
declare namespace Case {
    /**
     * Returns an array with the two "random" feature cases `Random` and `PseudoRandom`.
     * ```
     * [
     *    Case.Random,
     *    Case.PseudoRandom,
     * ]
     * ```
     */
    function randomCases(): Case[];
    /**
     * Returns an array with all the cases that do not depend on randomness.
     * ```
     * [
     *    Case.Upper,
     *    Case.Lower,
     *    Case.Title,
     *    Case.Toggle,
     *    Case.Camel,
     *    Case.Pascal,
     *    Case.UpperCamel,
     *    Case.Snake,
     *    Case.UpperSnake,
     *    Case.ScreamingSnake,
     *    Case.Kebab,
     *    Case.Cobol,
     *    Case.UpperKebab,
     *    Case.Train,
     *    Case.Flat,
     *    Case.UpperFlat,
     *    Case.Alternating,
     * ]
     * ```
   */
    function deterministicCases(): Case[];
    /**
     * Returns an array with all `Case` enum variants in no particular order.
     * ```
     * [
     *    Case.Upper,
     *    Case.Lower,
     *    Case.Title,
     *    Case.Toggle,
     *    Case.Camel,
     *    Case.Pascal,
     *    Case.UpperCamel,
     *    Case.Snake,
     *    Case.UpperSnake,
     *    Case.ScreamingSnake,
     *    Case.Kebab,
     *    Case.Cobol,
     *    Case.UpperKebab,
     *    Case.Train,
     *    Case.Flat,
     *    Case.UpperFlat,
     *    Case.Alternating,
     *    Case.Random,
     *    Case.PseudoRandom,
     * ]
     * ```
    */
    function allCases(): Case[];
    /**
     * Returns the delimiter used in the corresponding case.  The following
     * table outlines which cases use which delimeter.
     *
     * | Cases | Delimeter |
     * | --- | --- |
     * | Upper, Lower, Title, Toggle, Alternating, Random, PseudoRandom | Space |
     * | Snake, UpperSnake, ScreamingSnake | Underscore `_` |
     * | Kebab, Cobol, UpperKebab, Train | Hyphen `-` |
     * | UpperFlat, Flat, Camel, UpperCamel, Pascal | Empty string, no delimeter |
     */
    function delim(caseType: Case): string;
    /**
     * Returns the pattern used in the corresponding case.  The following
     * table outlines which cases use which pattern.
     *
     * | Cases | Pattern |
     * | --- | --- |
     * | Upper, UpperSnake, ScreamingSnake, UpperFlat, Cobol, UpperKebab | Uppercase |
     * | Lower, Snake, Kebab, Flat | Lowercase |
     * | Title, Pascal, UpperCamel, Train | Capital |
     * | Camel | Camel |
     * | Alternating | Alternating |
     * | Random | Random |
     * | PseudoRandom | PseudoRandom |
     * | Toggle | Toggle |
     */
    function pattern(caseType: Case): Pattern;
    /**
     * Returns the boundaries used in the corresponding case.  That is, where can word boundaries
     * be distinguished in a string of the given case.  The table outlines which cases use which
     * set of boundaries.
     *
     * | Cases | Boundaries |
     * | --- | --- |
     * | Upper, Lower, Title, Toggle, Alternating, Random, PseudoRandom | Space |
     * | Snake, UpperSnake, ScreamingSnake | Underscore `_` |
     * | Kebab, Cobol, UpperKebab, Train | Hyphen `-` |
     * | Camel, UpperCamel, Pascal | LowerUpper, LowerDigit, UpperDigit, DigitLower, DigitUpper, Acronym |
     * | UpperFlat, Flat | No boundaries |
     */
    function boundaries(caseType: Case): Boundary[];
}
/**
 * A boundary defines how a string is split into words.  Some boundaries, `Hyphen`, `Underscore`,
 * and `Space`, consume the character they split on, whereas the other boundaries
 * do not.
 *
 * The namespace offers methods that return `Boundary[]`s containing useful groups of boundaries.  It also
 * contains the {@link Boundary.listFrom listFrom} method which will generate a list of boundaries
 * based on a string slice.
 *
 * Note that all boundaries are distinct and do not share functionality.  That is, there is no
 * such DigitLetter variant, because that would be equivalent to the current `DigitUpper` and
 * `DigitLower` variants.  For common functionality, consider using
 * some provided functions that return a list of boundaries.
 */
declare enum Boundary {
    /**
     * Splits on `-`, consuming the character on segmentation.
     * ```
     * assert([Boundary.Hyphen] === Boundary.list_from("-"));
     * ```
     */
    Hyphen = 0,
    /**
     * Splits on `_`, consuming the character on segmentation.
     * ```
     * assert([Boundary.Underscore] === Boundary.list_from("_"));
     * ```
     */
    Underscore = 1,
    /**
     * Splits on space, consuming the character on segmentation.
     * ```
     * assert([Boundary.Space] === Boundary.list_from(" "));
     * ```
     */
    Space = 2,
    /**
     * Splits where an uppercase letter is followed by a lowercase letter.  This is seldom used,
     * and is not included in the {@link Boundary.defaults defaults}.
     * ```
     * assert([Boundary.UpperLower] === Boundary.list_from("Aa"));
     * ```
     */
    UpperLower = 3,
    /**
     * Splits where a lowercase letter is followed by an uppercase letter.
     * ```
     * assert([Boundary.LowerUpper] === Boundary.list_from("aA"));
     * ```
     */
    LowerUpper = 4,
    /**
     * Splits where digit is followed by an uppercase letter.
     * ```
     * assert([Boundary.DigitUpper] === Boundary.list_from("1A"));
     * ```
     */
    DigitUpper = 5,
    /**
     * Splits where an uppercase letter is followed by a digit.
     * ```
     * assert([Boundary.UpperDigit] === Boundary.list_from("A1"));
     * ```
     */
    UpperDigit = 6,
    /**
     * Splits where digit is followed by a lowercase letter.
     * ```
     * assert([Boundary.DigitLower] === Boundary.list_from("1a"));
     * ```
     */
    DigitLower = 7,
    /**
     * Splits where a lowercase letter is followed by a digit.
     * ```
     * assert([Boundary.LowerDigit] === Boundary.list_from("a1"));
     * ```
     */
    LowerDigit = 8,
    /**
     * Acronyms are identified by two uppercase letters followed by a lowercase letter.
     * The word boundary is between the two uppercase letters.  For example, "HTTPRequest"
     * would have an acronym boundary identified at "PRe" and split into "HTTP" and "Request".
     * ```
     * assert([Boundary.Acronym] === Boundary.list_from("AAa"));
     * ```
     */
    Acronym = 9
}
declare namespace Boundary {
    /**
     * Returns an array of the default boundaries when using `CaseString.toCase`, the only one missing is `UpperLower`.
     * ```
     * [
     *    Boundary.Underscore,
     *    Boundary.Hyphen,
     *    Boundary.Space,
     *    Boundary.LowerUpper,
     *    Boundary.UpperDigit,
     *    Boundary.DigitUpper,
     *    Boundary.DigitLower,
     *    Boundary.LowerDigit,
     *    Boundary.Acronym
     * ]
     * ```
     */
    function defaults(): Boundary[];
    /**
     * Returns the boundaries that split around single characters: `Hyphen`,
     * `Underscore`, and `Space`.
     * ```
     * [
     *    Boundary.Hyphen,
     *    Boundary.Underscore,
     *    Boundary.Space
     * ]
     * ```
     */
    function delims(): Boundary[];
    /**
     * Returns the boundaries that involve digits: `DigitUpper`, `DigitLower`, `UpperDigit`, and
     * `LowerDigit`.
     * ```
     * [
     *    Boundary.DigitUpper,
     *    Boundary.UpperDigit,
     *    Boundary.DigitLower,
     *    Boundary.LowerDigit
     * ]
     * ```
     */
    function digits(): Boundary[];
    /**
     * Returns the boundaries that are letters followed by digits: `UpperDigit` and `LowerDigit`.
     * ```
     * [
     *    Boundary.UpperDigit,
     *    Boundary.LowerDigit
     * ]
     * ```
     */
    function letterDigit(): Boundary[];
    /**
     * Returns the boundaries that are digits followed by letters: `DigitUpper` and
     * `DigitLower`.
     * ```
     * [
     *    Boundary.DigitUpper,
     *    Boundary.DigitLower
     * ]
     * ```
     */
    function digitLetter(): Boundary[];
    /**
     * Returns all boundaries.  Note that this includes the `UpperLower` variant which
     * might be unhelpful.  Please look at `Boundary.defaults()`.
     * ```
     * [
     *    Boundary.Underscore,
     *    Boundary.Hyphen,
     *    Boundary.Space,
     *    Boundary.LowerUpper,
     *    Boundary.UpperDigit,
     *    Boundary.DigitUpper,
     *    Boundary.DigitLower,
     *    Boundary.LowerDigit,
     *    Boundary.Acronym,
     *    Boundary.UpperLower
     * ]
     * ```
     */
    function all(): Boundary[];
    /**
     * Returns a list of all boundaries that are identified within the given string.
     * Could be a short of writing out all the boundaries in a list directly.  This will not
     * identify boundary `UpperLower` if it also used as part of `Acronym`.
     *
     * If you want to be very explicit and not overlap boundaries, it is recommended to use a colon
     * character.
     * ```
     * // [Boundary.Underscore, Boundary.LowerUpper, Boundary.DigitUpper]
     * Boundary.listFrom("aA:6A:_")
     * ```
     */
    function listFrom(str: string): Boundary[];
}
/**
 * A pattern is how a set of words is mutated before joining with
 * a delimeter.
 *
 * The `Random` and `PseudoRandom` patterns are used for their respective cases.
 */
declare enum Pattern {
    /**
     * Lowercase patterns make all words lowercase.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("case" === CS("Case").mutate({pattern: Pattern.Lowercase}).toString());
     * ```
     */
    Lowercase = 0,
    /**
     * Uppercase patterns make all words uppercase.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("CASE" === CS("Case").mutate({pattern: Pattern.Uppercase}).toString());
     * ```
     */
    Uppercase = 1,
    /**
     * Capital patterns makes the first letter of each word uppercase
     * and the remaining letters of each word lowercase.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("Case" === CS("case").mutate({pattern: Pattern.Capital}).toString());
     * ```
     */
    Capital = 2,
    /**
     * Capital patterns make the first word capitalized and the
     * remaining lowercase.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("Testing string" === CS("testing String").mutate({pattern: Pattern.Sentence, delim: " "}).toString());
     * ```
     */
    Sentence = 3,
    /**
     * Camel patterns make the first word lowercase and the remaining
     * capitalized.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("testingString" === CS("Testing string").mutate({pattern: Pattern.Camel}).toString());
     * ```
     */
    Camel = 4,
    /**
     * Alternating patterns make each letter of each word alternate
     * between lowercase and uppercase.  They alternate across words,
     * which means the last letter of one word and the first letter of the
     * next will not be the same letter casing.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("tEsTiNg-StRiNg" === CS("Testing string").mutate({pattern: Pattern.Alternating, delim: "-"}).toString());
     * ```
     */
    Alternating = 5,
    /**
     * Toggle patterns inverse uppercase and lowercase letters
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * assert("cASe" === CS("CasE").mutate({pattern: Pattern.Toggle}).toString());
     * ```
     */
    Toggle = 6,
    /**
     * Random patterns will lowercase or uppercase each letter
     * uniformly randomly.  This example will not pass the assertion due to randomness, but it used as an
     * example of what output is possible.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * // Could be "HElLo", "hEllO", etc
     * console.log(CS("hello").mutate({pattern: Pattern.Random}).toString());
     * ```
     */
    Random = 7,
    /**
     * PseudoRandom patterns are random-like patterns.  Instead of randomizing
     * each letter individually, it mutates each pair of characters
     * as either (Lowercase, Uppercase) or (Uppercase, Lowercase).  This generates
     * more "random looking" words.  A consequence of this algorithm for randomization
     * is that there will never be three consecutive letters that are all lowercase
     * or all uppercase.
     * ```
     * import { CS, Pattern } from "node-convert-case";
     *
     * // Could be "cONveRSioN", "cOnVeRSiOn" etc
     * console.log(CS("CONVERSION").mutate({pattern: Pattern.PseudoRandom}).toString());
     * ```
     */
    PseudoRandom = 8
}
/**
 * Extends `String` with `toCase`, `isCase`, and `mutate`.
 */
declare class CaseString extends String {
    /**
     * Convert the string into the given case.  It will reference `this` and create a new
     * `String` with the same pattern and delimeter as `case`.  It will split on boundaries
     * defined at `Boundary.defaults()`.
     *
     * Second argument is the case the string will be converted from, i.e. using only the boundaries included in that case.
     * ```
     * // Convert from kebab to cobol
     * assert("TOBE_OR NOT-TO-BE" === CS("toBe_or not-to-BE").toCase(Case.Cobol, Case.Kebab).toString());
     * ```
     */
    toCase(caseType: Case, fromCase?: Case): CaseString;
    /**
     * Determines if `this.toString()` is of the given case. This is done simply by applying the conversion and seeing if the result is the same.
     *
     * ```
     * // True
     * assert("SCREAMING_SNAKE_STRING".isCase(Case.ScreamingSnake));
     * assert("Train-Case-String".isCase(Case.Train));
     *
     * // False
     * assert("kebab-case-string".isCase(Case.Snake));
     * assert("kebab-case-string".isCase(Case.Train));
     * ```
     */
    isCase(caseType: Case): boolean;
    /**
     * Wrapper for the `set_pattern`, `add_boundaries` (+ `remove_boundaries`), and `set_delim` Converter methods.
     */
    mutate(options: {
        pattern?: Pattern;
        boundaries?: Boundary[];
        delim?: string;
    }): CaseString;
}
/**
 * Convenience function for creating a new `CaseString`.
 *
 * Because `CaseString` extends the `String` class you can use string prototype methods like `charAt` and `includes`.
 *
 * A side effect of this is that to use it like a primitive string, you have to call `toString` on the object or put it in a template string.
 *
 * ```
 * // [String (CaseString): 'TestingStringIHaveHere']
 * console.log(CS("Testing string I have here").toCase(Case.Pascal));
 *
 * // TestingStringIHaveHere
 * console.log(CS("Testing string I have here").toCase(Case.Pascal).toString());
 * console.log(`${CS("Testing string I have here").toCase(Case.Pascal)}`);
 * ```
 */
declare function CS(str: string): CaseString;
export { Case, Boundary, Pattern, CaseString, CS, };
