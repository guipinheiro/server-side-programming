<link href="./style.css" rel="stylesheet"></link>

# Introduction to Server Side Programming (SSP)

## How does the Internet work?

### What is a computer network?

When 2 computer communicate, you have to link them physically (usually ethernet cable) or wirelessly (like Wi-Fi or Bluetooth). When they are connected, they have a computer network.

You can connect as many computer as you want (usually using a tiny computer called a router, like a signaler at a railway station):

![a computer network using a router](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-3.png "a computer network")

Then, you can have a network of networks connecting as many devices as possible:

![a router connecting into another router](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-4.png "router to router")

### What is the Internet?

The Internet is basically a network of routers connecting to each other.

The main addition to the network when we are describing the Internet is the addition of a **Modem**. A modem turns the information of our network into information manageable by the telephone infrastructure, which is connected all around the world so we can reach basically anywhere.

After sending the information through a modem, we connect our network to a **Internet Service Provider** (ISP), so the message is carried from our network to the destination.

### What is the difference between the Internet and the Web?

While the Internet is the Infrastructure that connect computers, devices, servers, etc. the Web is a service that runs on the Internet (other services on the web are e-mail and IRC).

### What is the difference between the Internet, the Extranet, and the Intranet?

Intranets are private networks that restrict members have access, share files, communicate with each other. It can host web pages for sharing department or team information, shared drives, portals for administration tasks, wikis, discussion boards, etc.

Extranets are basically the same as Intranets, but they can share information with other organizations.

![Layers of the Internet, Extranet and Intranet](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work/internet-schema-8.png "networks-layers")

## How to find computers?

### What is an IP Address?

It's the domain name of a website or a unique device with a network connection.

### What are loopback addresses?

IP addresses identify individual servers on the Internet as well as devices outside of the Internet on local networks. Whenever a network is created, it gets its own IP address.

Loopback addresses are special IP addresses reserved for identify addresses on your local network. They start with **127**.

They can't be reached out from other devices. Instead, if you trigger a loopback request, it will stay own your own network instead of browsing the Internet.

### What is localhost?

In a computer network, localhost is a hostname that refers to the computer that is running the executing program.

The term is used when making a loopback request to one's own device (good for testing and security).

It is usually accessed by the IP 127.0.0.1.

The term localhost also is used as a domain name.

::1 is the IPv6 version of localhost, 127.0.0.1 is IPv4.

### What is localhost used for?

Web and Web Application Test: it can simulate a server on your machine so you can test your server and client files before making them public or paying for a server.

Network and speed test: Admins can test local networks without internet connection, just by sending a localhost request.

Blocking bad websites: Admins can reroute requests for unknown websites to localhost in order to prevent attacks on the network.

## What softwares do you need to build a website?

### How to create and edit web pages?

To create and edit a web page you need a text editor that lets you edit unformatted text (like Sublime, Atom, notepad++ or simply a notepad). It can be a built-in editor or a third party one.

### How to upload files on the Web?

After your website is ready for the public, you need to upload it to the internet. To do this, you need to buy space on a server. After that, the provider will send you the information of your username, password, and other information needed to connect to your web server. The connection through the server using FTP is always insecure, so you need to guarantee it allows as secure connection such as SFTP, RSync over SSH.

## What is a web server?

### What does web server refer to?

It can refer to hardware or software, or both of them working together.

### What is the **hardware** side web server?

The hardware side of a web server is a computer that stores web server software and website component files (like HTML documents, JS, images, etc.). It connects to the internet and supports physical data interchange with other devices connected to the internet.

### What is the **software** side web server?

The software side of a web server includes several parts that control how the web users access the hosted files. At minimum, it's an HTTP server, which is a software that understands URLs (web addresses) and HTTP (a protocol your browser uses to view web pages, request information, send information, update it, etc.).

The basic logic is as it follows: Browser requests a file hosted on a web server -> When the request reaches the correct (hardware) web server, the (software) HTTP Server accepts the request, finds the requested document, and sends it back to the browser, also through HTTP (if it doesn't find, it returns an error message, probably a 404 response instead of a 200).

### How to publish a website?

You can have either a **static** or **dynamic** web server.

A Static web server, or stack, consists of a computer (hardware) with a HTTP server (software) that **sends its hosted files as it is**.

A dynamic web server consists of a static web server plus extra software, usually an application server and a database. It's dynamic because the application server updates the hosted files before sending content to your browser via the HTTP server.

### What kind of files a web server has to host and why it is important to use a web server instead of your own computer?

It must have the capacity of hosting HTML files, CSS, JS, images, DBs, fonts, videos etc.

Why host your files in a web server instead of your own computer:

- A dedicated server is more available;
- Is almost always connected to the Internet (excluding downtime and system troubles);
- It can have dedicated IP address (having the same IP address all the time);
- It is maintained by a third party.

### How to communicate between your files, databases etc.?

You can communicate through **HTTP** (Hypertext Transfer Protocol). It transfers hypertext (linked web pages) between two computers using a protocol.

A **protocol** is a set of rules for communication between two computers. HTTP is a textual and stateless protocol:

- **Textual**: all commands are in plain-text and human-readable;
- **Stateless**: neither server nor the client remember previous interactions.

Communication between client and server:

- Usually, only clients make HTTP requests and servers respond to clients;
- When requesting a file via HTTP, clients must provide the file URL;
- The web server *must answer* every HTTP request, even with only error messages.

Communication between server and client:

- Upon receiving a request, HTTP server checks if the req. URL exists;
- If so, the web server sends the file content to the browser. If not, the server will check if it should generate a file dynamically for the request;
- If neither, it will return and error message (most common is a 404, not found).

### What is the difference between static and dynamic content?

Static means "server as-is", it just grabs the content on the server and display it to the user.

Dynamic means the server processes the content or even generate it on the fly from a database. It's more flexible, however the complexity increases.

## How to set up a local testing server?

### What is the difference between local and remote files?

While local files are stored in your machine an can be accessed directly through it, remote files need to be accessed from a different computer (server), usually using a HTTP request.

In your browser, if you see "file://" followed by a path in your hard drive, you are using a local file. If instead you see "http://" or "https://" the file has being received through HTTP.

### What are the problems with testing local files?

Some usages needs to have a server running on the back-end, so you can't just use plain html, css, and javascript. You need a special server to interpret the code and delivery results.

There are asynchronous requests the won't be run on local files due security reasons (like fetch on Chrome).

The inclusion of other files. If you load a local file that includes other local files may trigger a CORS error.

## How do you upload files to a web server?

You can use a variety of options.

### How to upload using SFTP?

In order to use an SFTP (never user FTP, their are inherently insecure), you need to use a software that can handle this type of operation. The most common are: FileZilla, CyberDuck, MonstaFTP. It is basically a software that manages your files and connection with your web hosting platform.

### How to upload using RSync?

RSync is a local-to-remote synchronizing tool, usually available on Unix-based systems (like Mac or Linux).

It has more advance options than SFTP, because the default usage is the command line.

There are GUI tools for RSync such as Acrosync.

### How to upload using Gitbub?

You can use Github Pages to publish your website or you can use a [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) to do it.

### What are other methods of uploading files to a web server?

There are HTML Interfaces that acts as a front-end for remote file upload service. Your hosting service should provide it.

WebDAV is also an option. It is a HTTP protocol extension to allow advanced file management options.

---

## Glossary

### Web Page

- A document that can be displayed in a web browser.

### Website

- A collection of web pages.

### Web server

- A computer that hosts a website for the internet.

### Search Engine

- A web service that helps finding other web pages.

### CORS

- CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, the determines whether browsers block frontend JS code from accessing responses for cross-origin requests.
- It is basically a way of telling your browser it may load resources of different origins (domain, scheme, or port) other than its own.
