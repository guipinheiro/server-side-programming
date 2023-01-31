<link href="./style.css"  rel="stylesheet"> </link>

# Client-side overview

## Web servers and HTTP

An HTTP request from the client contains:

- An **URL** identifying the target resource;
- A **method** that defines the required action:
  
  - `GET`: get a specific resource (HTML File, data from a JSON DB);
  - `POST`: Create a new resource (add new article to a wiki, add new contact to a DB);
  - `HEAD`: get metadata information about a specific resource without getting the body like `GET`;
  - `PUT`: Update an existing resource (or create a new one if it does not exist);
  - `DELETE`: Delete specified resource;
  - `TRACE`, `OPTIONS`, `CONNECT`, `PATCH`: More specific verbs used for some cases.
- Additional information can be encoded with the request (for example, HTML form data). Data can be encoded as:

  - URL parameters: `GET` requests encode data in the URL sent to the server (e.g. `http://example.com?Name=guilherme&age=11`). You always have the question mark (?) separating the rest of the URL from URL parameters, an equal sign (=) separating each parameter with its associated value and an ampersand (&) separating each pair. These requests are insecure because users can change their parameter in the URL and resubmitted, so they are not used for requests that update data in a server;
  - `POST` data: requests add a new resource, data is encoded within the request body (more secure);
  - Client-side cookies: Cookies contain session data about the client, including keys that the server can analyze to determine their login status and permissions/accesses to resources.

The HTTP response contains a [HTTP Response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) like `200 OK` if the resource was found, `404 Not found` if the resource was not found, `403 Forbidden` if the client does not have the privilege to access that info, etc. The body would contain the resource itself.

### GET request/response example

The request:

```http
GET /en-US/search?q=client+server+overview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _gat=1; _ga=GA1.2.1688886003.1471911953; ffo=true
```

First and the second line contains the most important info about the request:

- The request type (`GET`);
- The target resource URL (`/en-US/search`);
- The URL parameters (`?q=client+server+overview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev`);
- The target host/target website (`developer.mozilla.org`)
- The end of the first line also includes the protocol version `HTTP/1.1`

The final line contains information about the client-side cookies — it has an ID for managing sessions (`sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT;...`)

The remaining lines contain information about the browser used and the sort of responses it can handle. For example:

- The browser (`User-Agent`) is Mozilla Firefox (`Mozilla/5.0`)
- It can accept gzip compressed information (`Accept-Encoding: gzip`).
- It can accept the specified set of characters (`Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7`) and languages (`Accept-Language: en-US,en;q=0.8,es;q=0.6`).
- The `Referer` line indicates the address of the web page that contained the link to this resource (i.e. the origin of the request, `https://developer.mozilla.org/en-US/`).

In this case, there is no body on the request.

The Response:

```http
HTTP/1.1 200 OK
Server: Apache
X-Backend-Server: developer1.webapp.scl3.mozilla.com
Vary: Accept, Cookie, Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:11:31 GMT
Keep-Alive: timeout=5, max=999
Connection: Keep-Alive
X-Frame-Options: DENY
Allow: GET
X-Cache-Info: caching
Content-Length: 41823

<!DOCTYPE html>
<html lang="en-US" dir="ltr" class="redesign no-js"  data-ffo-opensanslight=false data-ffo-opensans=false >
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <script>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);</script>
  …
```

The first content of the response (before `<!DOCTYPE html>`) contains information like:

- The response code in the first line (`200 OK`), which tells the request succeeded;
- The content type of the response (`text/html`) using UTF-8 character set;
- It also tells us how big it is (`Content-Length: 41823`);

The remainder of the response header includes information about the response (when it was generated), the server, how is it expected to be handled by the browser, (e.g. `X-Frame-Options: DENY` which do not let other websites embed it as an iframe)

### POST request/response example

An HTTP `POST` is made when the client submit a form containing data to be saved on the server.

The request:

```http
POST /en-US/profiles/hamishwillee/edit HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Content-Length: 432
Pragma: no-cache
Cache-Control: no-cache
Origin: https://developer.mozilla.org
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/profiles/hamishwillee/edit
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; _gat=1; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _ga=GA1.2.1688886003.1471911953; ffo=true

csrfmiddlewaretoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT&user-username=hamishwillee&user-fullname=Hamish+Willee&user-title=&user-organization=&user-location=Australia&user-locale=en-US&user-timezone=Australia%2FMelbourne&user-irc_nickname=&user-interests=&user-expertise=&user-twitter_url=&user-stackoverflow_url=&user-linkedin_url=&user-mozillians_url=&user-facebook_url=
```

The main difference between a GET response and a POST response is that the URL has no parameters. The information is encoded in the body of the request.

The response:

```http
HTTP/1.1 302 FOUND
Server: Apache
X-Backend-Server: developer3.webapp.scl3.mozilla.com
Vary: Cookie
Vary: Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:38:13 GMT
Location: https://developer.mozilla.org/en-US/profiles/hamishwillee
Keep-Alive: timeout=5, max=1000
Connection: Keep-Alive
X-Frame-Options: DENY
X-Cache-Info: not cacheable; request wasn't a GET or HEAD
Content-Length: 0
```

The response status on the first line is `302 FOUND`, it tells the browser the POST was successful, and it must issue a second HTTP request to load the page specified in the `Location` field.

## Static Sites

Static sites are websites that return the same hard coded page every time a particular resource is requested. When a user wants to navigate to a page, the browser sends an `HTTP GET` request specifying the URL of its HTML page. The server retrieves the requested document from its file system and returns an HTTP response containing the document and an HTTP Response status code.

The server for static websites only needs to handle GET requests.

Even though a dynamic website is more common nowadays, the way statics websites are handled is still relevant because you will use static files on your dynamic website.

## Dynamic Sites

A dynamic site is one that can generate and return content based on the specific request URL and data. For instance, instead of storing data on a HTML file, you would store data in a DB then retrieve it in your dynamic web page.

While a Web Application (SSP code) usually handle requests and responses dealing with a database, it can also do other tasks, like sending email to users, perform logging in operations, etc.

### Return something other than HTML

Server-side website code does not have to return only HTML files. It can, instead, return other type of files (CSV, PDF, Text, etc.) or even data (JSON, XML, etc.).

The idea of returning data to a web browser so it can dynamically update its own content ([AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX), or Asynchronous Javascript And XML) has being around for quite some time. More recently, Single-page applications (SSP) have become popular where all website is written in a single HTML file that is dynamic updated.
