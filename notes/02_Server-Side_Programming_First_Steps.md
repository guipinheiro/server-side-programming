<link href="./style.css" rel="stylesheet"></link>

# Server-side programming (SSP)

## Introduction

Most large scale websites use server-side code to dynamically display different data when needed, generally sent by a database to the client.

It allows tailored data and experience for each user, makes it easy to store personal preferences and info (like credit card).

## What is SSP?

Web browsers communicate with web servers using HTTP. The request includes:

- An URL identifying the affected resource;
- A method that defines the action that will take place (GET, POST, PATCH, PUT, DELETE...);
- It may include additional information encoded in URL parameters (query-string), as POST data (data sent by HTTP POST method), or in associated cookies.

The web server waits for client request messages, process them upon their arrival, and reply to the web browser with an HTTP response. The response contains a status line indicating whether or not the request succeed.

The response body would contain the requested resource (an image, data, HTML page etc.).

SSP handles this communication exchange.

### Static sites

Static sites are websites that returns a hard-coded page from the server upon a GET request (when the user types the URL, a GET request is send to the server). The server retrieves the requested document and returns the HTTP response containing the document and a success status. If it could not be retrieved, it will respond an error message

![Static website diagram](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction/basic_static_app_server.png)

### Dynamic sites

In dynamic websites, some of the response content is generated dynamically, only when needed. It can return different data from the same URL based on the user preferences or information sent, and also can perform other operations as part of the response (sending notifications for instance).

Most code to support a dynamic website must run on a server. Create this code is called **Server-Side Programming**.

![Dynamic website diagram](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction/web_application_with_html_and_steps.png)

Requests for dynamic resources are instead forwarded (2) to server-side code (shown in the diagram as a Web Application). For "dynamic requests" the server interprets the request, reads required information from the database (3), combines the retrieved data with HTML templates (4), and sends back a response containing the generated HTML (5,6).

## Differences between server-side and client-side programming

The main differences are:

- They have different purposes;
- Usually in different languages (except JS that can be used on both with NodeJS)
- They run inside different operating systems environment

Code running in the web browser (client-side code) primarily cares with improving the appearance and behavior of a rendered web page.

Server-side code, on the other hand, involves choosing which content is returned in response to a HTTP request, handling tasks like validating submitted data and requests, using DBs to store information etc.

Server side can be written in many different languages like PHP, Python, NodeJS, Ruby, C# and it has full access of the environment (server operating system) and the developer can choose which language (or version) is running.

Both have frameworks to help building complex applications. While client-side ones usually are used to simplify layout and presentation tasks, server-side web frameworks provide "common" web server functionalities that you would have to implement yourself (such as support for sessions, support for users and authentication, easy DB access, templating libraries).

## What can you do on server-side?

It allows efficient information delivery tailored for the users. Examples:

- Amazon uses SSP to construct search results for their users, make targeted product suggestions;
- Banks use server-side programming to store account information, allow authorized users to view and make transactions;
- Social media SSP allows highlighting, sharing and controlling access to interesting content;

### Efficient storage and delivery of information

- How efficient would be creating a static web page for each Amazon product or each Facebook post? Not very much. Actually, it would be almost impossible or just too much expensive.

SSP can solve this kind issue by using databases to store information and then creating web pages using a template and filling it with data from these DBs, returning a HTML or even other types of documents (PDFs, images, CSVs etc.).

It is also possible to return data (JSON, XML) for rendering by appropriate client-side web frameworks (reducing the burden on the server and the data that needs to be sent).

The server is not limited to return data, it can also return the result of software tools, or data from communication services.

Also, having information on a DB instead of a static page helps with maintenance of the data. If you need to update something, like how many items there are in the inventory, you can just update it on the DB.

### Customize user experience

Servers can store and use information about the user so it can provide tailored user experience. For instance, you can have your credit card info saved in a database and do not have to enter it again, or even Google Maps saving your routing information to give information about it in advance.

### Controlled access to content

SSP can restrict the access of an user so only the authorized data is displayed.

### Store session/state information

SSP allows programmers to make use of sessions - a mechanism that allows a server to store information on the current user of a site and send different responses based on that information.

For instance, if you have previously logged in a website that keeps track of that information, it may display what you have missed in the past days you have about your email status, or even websites that store your IP so they block your access after some time and demand a subscription (like newspapers, Medium).

### Notification and communication

Push, SMSs, emails, etc. can be used by servers to notify the user about something (new mail, new Facebook post, bank transaction, confirmation of registration...)

### Data analysis

With the data collected from the user, a website can make an analysis of that data and provide refined responses bases on that analysis.
