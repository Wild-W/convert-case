import assert from "assert";

const rsBind = require("./index.node");

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
enum Case
{
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
    Upper,

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
    Lower,

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
    Title,

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
    Toggle,

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
    Camel,

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
    Pascal,

    /** Upper camel case is an alternative name for {@link Case.Pascal Pascal case}. */
    UpperCamel,

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
    Snake,

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
    UpperSnake,

    /** Screaming snake case is an alternative name for {@link Case.UpperSnake upper snake case}. */
    ScreamingSnake,

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
    Kebab,

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
    Cobol,

    /** Upper kebab case is an alternative name for {@link Case.Cobol Cobol case}. */
    UpperKebab,

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
    Train,

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
    Flat,

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
    UpperFlat,

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
    Alternating,

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
    Random,

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
    PseudoRandom,
}

namespace Case
{
    /** 
     * Returns an array with the two "random" feature cases `Random` and `PseudoRandom`.
     * ```
     * [
     *    Case.Random,
     *    Case.PseudoRandom,
     * ]
     * ```
     */
    export function randomCases(): Case[]
    {
        return [Case.Random, Case.PseudoRandom];
    }

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
    export function deterministicCases(): Case[]
    {
        return [
            Case.Upper,
            Case.Lower,
            Case.Title,
            Case.Toggle,
            Case.Camel,
            Case.Pascal,
            Case.UpperCamel,
            Case.Snake,
            Case.UpperSnake,
            Case.ScreamingSnake,
            Case.Kebab,
            Case.Cobol,
            Case.UpperKebab,
            Case.Train,
            Case.Flat,
            Case.UpperFlat,
            Case.Alternating,
        ];
    }

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
    export function allCases(): Case[]
    {
        return [
            Case.Upper,
            Case.Lower,
            Case.Title,
            Case.Toggle,
            Case.Camel,
            Case.Pascal,
            Case.UpperCamel,
            Case.Snake,
            Case.UpperSnake,
            Case.ScreamingSnake,
            Case.Kebab,
            Case.Cobol,
            Case.UpperKebab,
            Case.Train,
            Case.Flat,
            Case.UpperFlat,
            Case.Alternating,
            Case.Random,
            Case.PseudoRandom,
        ];
    }

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
    export function delim(caseType: Case): string
    {
        assert(caseType in Case);

        return {
            [Case.Upper]: " ",
            [Case.Lower]: " ",
            [Case.Title]: " ",
            [Case.Toggle]: " ",
            [Case.Camel]: "",
            [Case.Pascal]: "",
            [Case.UpperCamel]: "",
            [Case.Snake]: "_",
            [Case.UpperSnake]: "_",
            [Case.ScreamingSnake]: "_",
            [Case.Kebab]: "-",
            [Case.Cobol]: "-",
            [Case.UpperKebab]: "-",
            [Case.Train]: "-",
            [Case.Flat]: "",
            [Case.UpperFlat]: "",
            [Case.Alternating]: " ",
            [Case.Random]: " ",
            [Case.PseudoRandom]: " ",
        }[caseType];
    }

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
    export function pattern(caseType: Case): Pattern
    {
        assert(caseType in Case);
        
        return {
            [Case.Upper]: Pattern.Uppercase,
            [Case.Lower]: Pattern.Lowercase,
            [Case.Title]: Pattern.Capital,
            [Case.Toggle]: Pattern.Toggle,
            [Case.Camel]: Pattern.Camel,
            [Case.Pascal]: Pattern.Capital,
            [Case.UpperCamel]: Pattern.Capital,
            [Case.Snake]: Pattern.Lowercase,
            [Case.UpperSnake]: Pattern.Uppercase,
            [Case.ScreamingSnake]: Pattern.Uppercase,
            [Case.Kebab]: Pattern.Lowercase,
            [Case.Cobol]: Pattern.Uppercase,
            [Case.UpperKebab]: Pattern.Uppercase,
            [Case.Train]: Pattern.Capital,
            [Case.Flat]: Pattern.Lowercase,
            [Case.UpperFlat]: Pattern.Uppercase,
            [Case.Alternating]: Pattern.Alternating,
            [Case.Random]: Pattern.Random,
            [Case.PseudoRandom]: Pattern.PseudoRandom,
        }[caseType];
    }

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
    export function boundaries(caseType: Case): Boundary[]
    {
        assert(caseType in Case);

        return {
            [Case.Upper]: [Boundary.Space],
            [Case.Lower]: [Boundary.Space],
            [Case.Title]: [Boundary.Space],
            [Case.Toggle]: [Boundary.Space],
            [Case.Camel]: [Boundary.LowerUpper, Boundary.LowerDigit, Boundary.UpperDigit, Boundary.DigitLower, Boundary.DigitUpper, Boundary.Acronym],
            [Case.Pascal]: [Boundary.LowerUpper, Boundary.LowerDigit, Boundary.UpperDigit, Boundary.DigitLower, Boundary.DigitUpper, Boundary.Acronym],
            [Case.UpperCamel]: [Boundary.LowerUpper, Boundary.LowerDigit, Boundary.UpperDigit, Boundary.DigitLower, Boundary.DigitUpper, Boundary.Acronym],
            [Case.Snake]: [Boundary.Underscore],
            [Case.UpperSnake]: [Boundary.Underscore],
            [Case.ScreamingSnake]: [Boundary.Underscore],
            [Case.Kebab]: [Boundary.Hyphen],
            [Case.Cobol]: [Boundary.Hyphen],
            [Case.UpperKebab]: [Boundary.Hyphen],
            [Case.Train]: [Boundary.Hyphen],
            [Case.Flat]: [],
            [Case.UpperFlat]: [],
            [Case.Alternating]: [Boundary.Space],
            [Case.Random]: [Boundary.Space],
            [Case.PseudoRandom]: [Boundary.Space],
        }[caseType];
    }
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
enum Boundary
{
    /**
     * Splits on `-`, consuming the character on segmentation.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::Hyphen],
     *     Boundary::list_from("-")
     * );
     * ```
     */
    Hyphen,

    /**
     * Splits on `_`, consuming the character on segmentation.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::Underscore],
     *     Boundary::list_from("_")
     * );
     * ```
     */
    Underscore,

    /**
     * Splits on space, consuming the character on segmentation.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::Space],
     *     Boundary::list_from(" ")
     * );
     * ```
     */
    Space,

    /**
     * Splits where an uppercase letter is followed by a lowercase letter.  This is seldom used,
     * and is not included in the {@link Boundary.defaults defaults}.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::UpperLower],
     *     Boundary::list_from("Aa")
     * );
     * ```
     */
    UpperLower,

    /**
     * Splits where a lowercase letter is followed by an uppercase letter.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::LowerUpper],
     *     Boundary::list_from("aA")
     * );
     * ```
     */
    LowerUpper,

    /**
     * Splits where digit is followed by an uppercase letter.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::DigitUpper],
     *     Boundary::list_from("1A")
     * );
     * ```
     */
    DigitUpper,

    /**
     * Splits where an uppercase letter is followed by a digit.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::UpperDigit],
     *     Boundary::list_from("A1")
     * );
     * ```
     */
    UpperDigit,

    /**
     * Splits where digit is followed by a lowercase letter.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::DigitLower],
     *     Boundary::list_from("1a")
     * );
     * ```
     */
    DigitLower,

    /**
     * Splits where a lowercase letter is followed by a digit.
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::LowerDigit],
     *     Boundary::list_from("a1")
     * );
     * ```
     */
    LowerDigit,

    /**
     * Acronyms are identified by two uppercase letters followed by a lowercase letter.
     * The word boundary is between the two uppercase letters.  For example, "HTTPRequest"
     * would have an acronym boundary identified at "PRe" and split into "HTTP" and "Request".
     * ```
     * use convert_case::Boundary;
     * assert_eq!(
     *     vec![Boundary::Acronym],
     *     Boundary::list_from("AAa")
     * );
     * ```
     */
    Acronym,
}

namespace Boundary
{
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
    export function defaults(): Boundary[]
    {
        return [
            Boundary.Underscore,
            Boundary.Hyphen,
            Boundary.Space,
            Boundary.LowerUpper,
            Boundary.UpperDigit,
            Boundary.DigitUpper,
            Boundary.DigitLower,
            Boundary.LowerDigit,
            Boundary.Acronym
        ];
    }

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
    export function delims(): Boundary[]
    {
        return [Boundary.Hyphen, Boundary.Underscore, Boundary.Space];
    }

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
    export function digits(): Boundary[]
    {
        return [Boundary.DigitUpper, Boundary.UpperDigit, Boundary.DigitLower, Boundary.LowerDigit];
    }

    /**
     * Returns the boundaries that are letters followed by digits: `UpperDigit` and `LowerDigit`.
     * ```
     * [
     *    Boundary.UpperDigit,
     *    Boundary.LowerDigit
     * ]
     * ```
     */
    export function letterDigit(): Boundary[]
    {
        return [Boundary.UpperDigit, Boundary.LowerDigit];
    }

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
    export function digitLetter(): Boundary[]
    {
        return [Boundary.DigitUpper, Boundary.DigitLower];
    }

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
    export function all(): Boundary[]
    {
        return [
            Boundary.Underscore,
            Boundary.Hyphen,
            Boundary.Space,
            Boundary.LowerUpper,
            Boundary.UpperDigit,
            Boundary.DigitUpper,
            Boundary.DigitLower,
            Boundary.LowerDigit,
            Boundary.Acronym,
            Boundary.UpperLower
        ];
    }

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
    export function listFrom(str: string): Boundary[]
    {
        return rsBind.listFrom(str);
    }
}

/**
 * A pattern is how a set of words is mutated before joining with
 * a delimeter.
 *
 * The `Random` and `PseudoRandom` patterns are used for their respective cases.
 */
enum Pattern
{
    /**
     * Lowercase patterns make all words lowercase.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("case" === CS("Case").mutate({pattern: Pattern.Lowercase}).toString());
     * ```
     */
    Lowercase,

    /**
     * Uppercase patterns make all words uppercase.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("CASE" === CS("Case").mutate({pattern: Pattern.Uppercase}).toString());
     * ```
     */
    Uppercase,

    /**
     * Capital patterns makes the first letter of each word uppercase
     * and the remaining letters of each word lowercase.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("Case" === CS("case").mutate({pattern: Pattern.Capital}).toString());
     * ```
     */
    Capital,

    /**
     * Capital patterns make the first word capitalized and the
     * remaining lowercase.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("Testing string" === CS("testing String").mutate({pattern: Pattern.Sentence, delim: " "}).toString());
     * ```
     */
    Sentence,

    /**
     * Camel patterns make the first word lowercase and the remaining
     * capitalized.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("testingString" === CS("Testing string").mutate({pattern: Pattern.Camel}).toString());
     * ```
     */
    Camel,

    /**
     * Alternating patterns make each letter of each word alternate
     * between lowercase and uppercase.  They alternate across words,
     * which means the last letter of one word and the first letter of the
     * next will not be the same letter casing.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("tEsTiNg-StRiNg" === CS("Testing string").mutate({pattern: Pattern.Alternating, delim: "-"}).toString());
     * ```
     */
    Alternating,

    /**
     * Toggle patterns inverse uppercase and lowercase letters
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * assert("cASe" === CS("CasE").mutate({pattern: Pattern.Toggle}).toString());
     * ```
     */
    Toggle,

    /**
     * Random patterns will lowercase or uppercase each letter
     * uniformly randomly.  This example will not pass the assertion due to randomness, but it used as an 
     * example of what output is possible.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * // Could be "HElLo", "hEllO", etc
     * console.log(CS("hello").mutate({pattern: Pattern.Random}).toString());
     * ```
     */
    Random,

    /**
     * PseudoRandom patterns are random-like patterns.  Instead of randomizing
     * each letter individually, it mutates each pair of characters
     * as either (Lowercase, Uppercase) or (Uppercase, Lowercase).  This generates
     * more "random looking" words.  A consequence of this algorithm for randomization
     * is that there will never be three consecutive letters that are all lowercase
     * or all uppercase.
     * ```
     * import { CS, Pattern } from "convert-case";
     * 
     * // Could be "cONveRSioN", "cOnVeRSiOn" etc
     * console.log(CS("CONVERSION").mutate({pattern: Pattern.PseudoRandom}).toString());
     * ```
     */
    PseudoRandom,
}

/**
 * Extends `String` with `toCase`, `isCase`, and `mutate`.
 */
class CaseString extends String
{
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
    toCase(caseType: Case, fromCase?: Case): CaseString
    {
        assert(caseType in Case);
        if (fromCase !== undefined) assert(fromCase in Case);

        return CS(rsBind.toCase(this.toString(), caseType, fromCase));
    }

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
    isCase(caseType: Case): boolean
    {
        assert(caseType in Case);
        return rsBind.isCase(this.toString(), caseType);
    }

    /**
     * Wrapper for the `set_pattern`, `add_boundaries` (+ `remove_boundaries`), and `set_delim` Converter methods.
     */
    mutate(options: {pattern?: Pattern, boundaries?: Boundary[], delim?: string}): CaseString
    {
        if (options.pattern !== undefined) assert(options.pattern in Pattern);
        if (options.boundaries !== undefined)
        {
            for (let i = 0; i < options.boundaries.length; i++)
            {
                assert(options.boundaries[i] in Boundary);
            }
        }
    
        return CS(rsBind.mutate(this.toString(), options));
    }
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
function CS(str: string): CaseString
{
    return new CaseString(str);
}

export {
    Case,
    Boundary,
    Pattern,
    CaseString,
    CS,
};
