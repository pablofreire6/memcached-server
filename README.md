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

### Storage Commands
Sample of basic storage operations supported

> set data will store the given data with the given key
```
set foo 0 900 5
hello

```

> add data will only add if server already doesnt have data for the given key
```
add bar 0 900 4
test

```

> replace data will only store the data if the given key already exists
```
replace foo 0 900 7
updated

```

> append data will add the data to an existing key after existing data
```
append foo 0 900 5
after

```

> prepend data will add the data to an existing key before existing data
```
prepend foo 0 900 6
before

```

## Retrieval Commands
> Read the data for the given key
```
get foo
```

> Read data for the list of keys send after the command separated by whitespace
```
get foo bar
```
