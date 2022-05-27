### Error Printer for NodeJS
This project provides a simple function for nodejs where you can automatically write the error message, error code, error date and formatted error date to a file.

###### How to test:
```
yarn test
```

###### How to run:
```
yarn start
```

###### How to use in the project:
```
(in ES6)
import error_log from "error-printer";

try {
  // ... any codes
} catch(err) {
  error_log({
    message: err.message
  });
}
```
