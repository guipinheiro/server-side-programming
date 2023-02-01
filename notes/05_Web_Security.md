<link href="style.css" rel="stylesheet"></link>

# Web Security

Web security is:

> The act or the practice of protecting websites from unauthorized access, use, modification, destruction, or disruption.

It requires design effort across the whole website: in your web application, configuration of the web server, policies for creating and renewing passwords, and client-side code.

## Website security threats

### Cross-Site Scripting (XSS)

XSS is a term used to describe a class of attack that consists of an attacker being allowed to inject client-side scripts through the website into browsers of other users. Basically, an attacker manages to inject a malicious script to the website. Then, another user logs in the website, for example, the script runs (and it is trusted by the browser because it comes from the website itself) and sends the cookie with the key for logging into that website as that user to the attacker.

There are two types of XSS attacks based on how the site returns the injected scripts to a browser:

- **Reflected**: Occurs when user content that is passed to the server is returned *immediately* and *unmodified* for display in the browser;
- **Persistent**: Occurs when the malicious script is stored on the website and then later redisplayed unmodified for other users to execute without they being aware

`POST` and `GET` requests are the most common source of XSS vulnerabilities, but there are other ways of doing this sort of attack, like files that are uploaded and displayed or cookie data rendered by the browser.

The best defense against XSS vulnerabilities is removing or disabling any markup that can potentially contain instructions to run the malicious code. For HTML, this includes elements such as `<script>`, `<object>`, `<embed>`, and `<link>`.

The process of modifying user data so it cannot be used to run scripts or otherwise affect the execution of server code is known as **input sanitization**. Frameworks usually already sanitizes user input from HTML forms.

### SQL Injection

SQL injections enable malicious users to execute arbitrary SQL code on a database, allowing data to be accessed, modified, deleted irrespective of the user's permissions. It include types like: Error-based SQL Injection, SQL injection based on boolean errors, and Time-based SQL injection.

For instance, let's say you have a query to list all users with a particular username:

```sql
statement = "SELECT * FROM users WHERE name = '" + userName + "';"
```

In the above statement, the query would normally be used as a name input by the user. However, if they want, they could try passing a malicious code instead of the username:

```sql
a';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't;
```

Let's say the user passes this code. Now the query would be like this:

```sql
SELECT * FROM users WHERE name = 'a';DROP TABLE users; SELECT * FROM userinfo WHERE 't' = 't';
```

This would allow the malicious injection to delete the table `users` and accessing the information from `userInfo`.

To avoid this type of attack, you should make sure that the user input cannot change the nature of the query. One way to solve the attack above would be escaping all character in the user input that have a special meaning (in this case the ' character that, in SQL, treats the string as the end or the beginning of a string literal)

### Cross-Site Request Forgery (CSRF)

CSRF attack executes actions using credentials of another user without their knowledge.

Example: There is a website that makes financial transactions through HTTP requests. A malicious user creates a form that includes his bank details and amount of money as hidden fields. He emails it to other users and anyone that clicks in the submit button (disguised as another thing) will send money to him if the user has logging and authorization cookies in his browser.

One way to prevent this is to create a secret or something the user has to do before making the transaction.

### Other common threats

- **Clickjacking**: It hacks a real content on a website and changes it for a fake one leading the data sent to another place using an invisible `iframe`. To prevent this, the website can prevent itself from being embedded into an `iframe` in another website by setting up the appropriate headers;
- **Denial of Service**: DoS is achieved by flooding the server with multiple requests or requests that requires large amount of data. A defense would be identifying and blocking "bad" traffic while allowing legitimate messages through. These defenses are usually located before or in the web server;
- **Directory Traversal**: The malicious user attempts to access resources that wouldn't normally be available usually by using system navigation characters like `/../..`. The solution would be sanitize the data input by the user;
- **File Inclusion**: User is able to specify an "unintended" file for display or execution in data passed to the server. When loaded, this file would be executed on the web server or client-side (leading to an XSS attack). Again, sanitization would be the solution;
- **Command Injection**: Command injection attacks allow a malicious user to execute arbitrary system commands on the host operating system. The solution is to sanitize user input before it might be used in system calls.

## Key points of web security

Almost all security attacks come from trusting user input data (and not sanitize them).

So, be paranoic and **NEVER TRUST DATA FROM A BROWSER**.

Other tips:

- User more efficient password management;
- Configure the web server to use HTTPS and HTTP Strict Transport Security (HSTS);
- Keep track of the most popular threats ([OWASP list](https://owasp.org/www-project-top-ten/)) and address the most common ones first;
- Use vulnerabilities scanning tools ([OWASP list](https://owasp.org/www-community/Vulnerability_Scanning_Tools)). Or, if you have spare money, promote a bug bounty;
- Only store and display data that you need, for example, credit cards. Just show and store enough digits (usually the last 4) so the user can identify it.
