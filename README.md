# Memcached Server Challenge
The idea is to build a Memcached Server with basic commands that can be used by any Memcached client

## Installation
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Clone
Clone this repo to your local machine 

### Setup
> Install node dependencies first
```
npm install
```

> Run the server (by default the server run on port 9000)
```
npm start
```
> Run in a different port
```
PORT=8000 npm start
```

## Tests
The set of tests was built using Jest that also includes the tools to get the coverage

> Run the tests
```
npm test
```

> Run tests with coverage
```
npm test -- --coverage
```

## Usage
We can connect using any Memcached client or command line with telnet or nc

> Conneting with nc
```
nc localhost 9000
```

> Store data
```
set foo 0 900 5
hello

```
> Read data
```
get foo
```
