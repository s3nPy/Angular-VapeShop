# Angular VapeShop

This project is a vape-themed online store with admin panel and firebase as backend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need [Node.js](https://github.com/nodejs) installed on your machine  

```
$  node -v
v12.16.3
```

### Installing

Install all dependencies:

```
root$  npm install
```

### Run project

1) Create firebase project [here](https://firebase.google.com/).

2) Add user for realtime database

2) Replace api in *src/environment/environment.ts*:
```
fbApiKey: '<paste your api key here>',
```
4) Then run client via one command:
```
root$  npm start
```

## Author

* **Ivanov Daniil** [s3nPy](https://github.com/s3nPy)

## Acknowledgments

This project was created to learn new technologies:

* Angular 10 
* RxJs
* Materializecss
