# Convert-Case

Node.js bindings for [convert_case](https://docs.rs/convert_case/latest/convert_case/). This project was created using [neon](https://neon-bindings.com/).

## Installing

```sh
npm install convert-case
```

## Usage

```ts
import { Case, Boundary, Pattern, CS } from "convert-case";

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

## Contributing/Modifying

Building convert-case requires a [supported version of Node and Rust](https://github.com/neon-bindings/neon#platform-support).

First, download this repo's source code, then you can install the project with npm. In the project directory, run:

```sh
npm install
```

This fully installs the project, including installing any dependencies and running the build.

To build after you've already installed, run:

```sh
npm run build
```

To run tests:

```sh
npm test
```

This command uses the [cargo-cp-artifact](https://github.com/neon-bindings/cargo-cp-artifact) utility to run the Rust build and copy the built library into `./index.node`.


## Learn More

To learn more about Neon, see the [Neon documentation](https://neon-bindings.com).

To learn more about Rust, see the [Rust documentation](https://www.rust-lang.org).

To learn more about Node, see the [Node documentation](https://nodejs.org).
