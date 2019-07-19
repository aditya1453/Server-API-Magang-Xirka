# API Database Server SmartLog Xirka
Repository Pekerjaan KP PT.Xirka Silicon Technology dengan Topik Website SmartLog

>Server API ini dibuat dengan menggunakan ExpressJS yang merupakan web framework untuk Node.JS dan menggunakan postgreSQL untuk database nya. Server ini dapat menerima HTTP request method GET, POST, PUT, dan DELETE dengan dilengkapi autentikasi menggunakan token.

## Table of Contents
1. [Prerequisites](#Prerequisites)
2. [Installation](#Installation)
    - [Database PostgreSQL](##Database-PostgreSQL)
    - [Server Node.JS](Server-Node.js)
3. [Run Server](#Run-Server)
4. [API Request](#API-Request)
5. [Author](#Author)

## Prerequisites
- PostgreSQL
```sh
$ [sudo] apt install postgresql
```
- Node.JS and NPM (NodeJS Package Manager)
```sh
$ [sudo] apt install nodejs
$ [sudo] apt install npm
```
## Installation
### Database PostgreSQL
Database dibuat menggunakan 2 tabel dengan format berikut:
- Tabel *card*

|column|Data Type|Modifiers|Description|
|:---:|:----:|:----:|:---:|
|card_id|varchar(30)|not null|primary key|
|nim|varchar(30)|not null||
|name|varchar(30)|not null||
|instansi|varchar(30)|||

- Tabel *terminal*

|column|Data Type|Modifiers|Description|
|:---:|:----:|:----:|:---:|
|terminal_id|varchar(30)|not null|primary key|
|room|varchar(30)|not null||
|instansi|varchar(30)|||

Penjelasan tentang tipe data di postgreSQL dapat dilihat di http://www.postgresqltutorial.com/postgresql-data-types/

**Langkah pembuatan database dan tabel**
1. Buat database baru
```sh
$ sudo -u postgres psql
postgres=# create database <nama database>;
```
2. Buat user baru dan berikan akses penuh ke database baru yang sudah dibuat
```sh
postgres=# create user <nama user> with encrypted password '<user password>';
postgres=# grant all privileges on database <nama database> to <nama user>;
postgres=# \q
```
3. Masuk ke database yang telah dibuat
>Untuk log in dengan ident based authentication dibutuhkan nama linux user yang sama dengan nama user pada postgresql, jika berbeda dapat ditambahkan dengan cara `sudo adduser <nama user>`

```sh
$ sudo -i -u <nama user>
$ psql <nama database>
```
>kemudian akan muncul `<nama database>=#` pada terminal
4. Buat tabel baru dengan nama card dan terminal menggunakan format seperti [diatas](Database-postgreSQL)
```sql
create table card(
    card_id varchar(30) primary key,
    nim varchar(30) not null,
    name varchar(30) not null,
    instansi varchar(30)
);

create table terminal(
    terminal_id varchar(30) primary key,
    room varchar(30) not null,
    instansi varchar(30)
);
```

### Server Node.JS
1. Clone repository ini ke komputer server
```sh
$ git clone https://github.com/Dimasyoga/xirka.git
```
2. Masuk ke directory repository `cd xirka`, kemudian masukkan perintah:
```sh
$ npm install
```
3. Cek settingan database pada file config.js


## Run Server
Nyalakan server dengan memasukkan perintah `npm start` pada *root directory* repository ini
> Untuk membuat server menyala di background, dapat digunakan perintah `nohup` ke terminal atau menggunakan modul [forever](https://www.npmjs.com/package/forever)
### Penggunaan Package Forever
- Install package dengan perintah:
```sh
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
