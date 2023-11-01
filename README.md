# JSConverter API

Transform and adapt JavaScript code for different environments.

## Features

- **TypeScript Conversion** (`/convert-ts`)
    - Converts TypeScript to CommonJS JavaScript
    - Preserves type definitions as comments
    - Handles interfaces and type declarations
    - Supports latest TypeScript syntax

- **Modern JavaScript Transpilation** (`/convert-esnext`)
    - Transpiles ESNext features to ES5
    - Converts modern syntax (async/await, spread, etc.)
    - Handles latest ECMAScript features
    - Uses Babel with preset-env

## Quick Start

```bash
# Install dependencies
make install

# Start API
make run

# Check logs
make logs
```

## Usage Examples

### Convert TypeScript
```bash
cat testScripts/test-typescript-file.ts | curl -X POST http://localhost:3000/convert-ts \
-H "Content-Type: text/plain" \
--data-binary @-
```

### Transpile ESNext
```bash
cat testScripts/test-es8-file.js | curl -X POST http://localhost:3000/transpile-esnext \
-H "Content-Type: text/plain" \
--data-binary @-
```

## Make Commands
- `make install`: Install dependencies
- `make start`: Run in development mode
- `make build`: Build and create Docker image
- `make run`: Start API
- `make stop`: Stop API
- `make logs`: View logs