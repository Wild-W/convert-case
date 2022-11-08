# Node-Convert-Case

Node.js bindings for [convert_case](https://docs.rs/convert_case/latest/convert_case/). This project was created using [neon](https://neon-bindings.com/).


## Installing

```sh
npm install node-convert-case
```


## Usage

```ts
import { Case, Boundary, Pattern, CS } from "node-convert-case";

// Using toCase
let marioTitle: string = CS("super_mario_64").toCase(Case.Title).toString();
assert("Super Mario 64" === marioTitle);

// Using toCase with the optional argument 'fromCase'
marioTitle = CS("super_mario_64").toCase(Case.Title, Case.Lower).toString();
assert("Super_mario_64" === marioTitle);

// Using isCase
let pascalStr = "ExceptionHandler";
assert(CS(pascalStr).isCase(Case.Pascal));

// Using mutate
let characterCode: string = CS("567N9854G321K").mutate(
    {
        boundaries: [Boundary.UpperDigit],
        delim: "-",
        pattern: Pattern.Lowercase
    }
).toString();
assert("567n-9854g-321k" === characterCode);
```

The included declaration file has extensive documentation on how to use just about everything included, this is just a quick example. For more examples, check out the [tests](./tests/all.test.ts).


## Cases

This is list of cases that node-convert-case supports.  Some cases are simply aliases of others.

| Case | Example |
| ---- | ------- |
| Upper | MY VARIABLE NAME |
| Lower | my variable name |
| Title | My Variable Name |
| Toggle | mY vARIABLE nAME |
| Alternating | mY vArIaBlE nAmE |
| Camel | myVariableName |
| Pascal | MyVariableName |
| UpperCamel | MyVariableName |
| Snake | my\_variable\_name |
| UpperSnake | MY\_VARIABLE\_NAME |
| ScreamingSnake | MY\_VARIABLE\_NAME |
| Kebab | my-variable-name |
| Cobol | MY-VARIABLE-NAME |
| Train | My-Variable-Name |
| Flat | myvariablename |
| UpperFlat | MYVARIABLENAME |
| Random | MY vaRiabLe nAME |
| PseudoRandom | mY VaRiAblE nAMe |


## Contributing/Modifying

Building node-convert-case requires a [supported version of Node and Rust](https://github.com/neon-bindings/neon#platform-support).

First, download this repo's source code, then you can install the project with npm. In the project directory, run:

```sh
npm install
```

This fully installs the project, including installing any dependencies and running the build.

To build after you've already installed, run:

```sh
npm run build
```
This command builds and copies the built library into `./index.node`.

To run tests:

```sh
npm test
```


## Learn More

To learn more about Neon, see the [Neon documentation](https://neon-bindings.com).

To learn more about Rust, see the [Rust documentation](https://www.rust-lang.org).

To learn more about Node, see the [Node documentation](https://nodejs.org).
