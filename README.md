# API Database Server Xirka SmartLog
Repository Pekerjaan KP PT.Xirka Silicon Technology dengan Topik Website SmartLog

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Run Server](#Run_Server)
- [API Request](#API_Request)
- [Author](#Author)

## Prerequisites
- Install PostgreSQL
```sh
$ [sudo] apt install postgresql
```
- Install Node.JS and NPM (NodeJS Package Manager)
```sh
$ [sudo] apt install nodejs
$ [sudo] apt install npm
```
## Installation
### Database PostgreSQL

### Server Node.JS
1. Clone repository ini ke komputer server
2. Masuk ke directory repository `cd xirka`, kemudian masukkan perintah:
```
$ npm install
```
3. Cek settingan database pada file config.js


## Run Server
Nyalakan server dengan memasukkan perintah `npm start` pada *root directory* repository ini
> Untuk membuat server menyala di background, dapat digunakan perintah `nohup` ke terminal atau menggunakan modul [forever](https://www.npmjs.com/package/forever)
### Penggunaan Package Forever
- Install package dengan perintah:
```
$ [sudo] npm install forever -g
```
- Untuk menjalankan server, masukkan perintah `forever start` ke terminal pada *root directory*
- Untuk melakukan pengecekan perintah forever yang berjalan, masukkan perintah `forever list` ke terminal dan akan muncul daftar perintah forever yang berjalan
- Untuk menghentikan semua perintah forever yang berjalan, masukkan perintah `forever stopall` ke terminal
- Daftar perintah lengkap dapat dilihat di https://www.npmjs.com/package/forever

## API Request

## Author
* **Dimas Yoga** 
Email : dimasyogapra@gmail.com
