<link href="./style.css"  rel="stylesheet"> </link>

# What can a web framework do for you?

Web frameworks simply the development of web applications. For instance, you could create from the scratch an application that makes a server runs and deals with `GET` and `POST` requests from your web page, but that would take a lot of time. Web frameworks simplify this process with libraries that contains pre-made code to use in your tasks, like `express` for NodeJS or `Django` for Python to solve the application above.

So, what can they do?

## Work directly with HTTP requests and responses

Once web servers and browsers communicate through HTTP protocol, web frameworks allows simplified syntax for dealing with responses and requests. Meaning, you don't have to write your self lower level networking primitives.

Example in Python:

```python
# Django view function
from django.http import HttpResponse

def index(request):
    # Get an HttpRequest (request)
    # perform operations using information from the request.
    # Return HttpResponse
    return HttpResponse('Output string to return')
```

## Route requests to appropriate handlers

Sites have different resources that can be accessed from different URLs. Instead of mapping them all, web frameworks can map an URL pattern to specified handlers functions. This way, it becomes an easier burden to maintain URLs changes.

## Make it easy to access data in the request

Since HTTP requests can have data in the URL parameters (in a GET) or in the request body (in a POST), web frameworks provide programming-language-appropriate mechanisms to deal with this data. For instance, the HttpRequest object that Django passes to every view function contains methods and properties for accessing the target URL, the type of request (e.g. an HTTP GET), GET or POST parameters, cookie and session data, etc.

## Abstract and simplify database access

Web frameworks often provide a database layer that abstracts DB read, write, query, and delete operations. This abstraction is referred as Object-Relational Mapper (ORM).

Benefits of using an ORM:

- Replace the underlying database without necessarily needing to change the code that uses it. This allows developers to optimize for the characteristics of different DBs and their usage;
- Basic validation of data can be done in the framework itself.

For example, Django provides a ORM that refers to the object used to define the structure of a record as a *model*. The model specifies data type, which provide field-level validation, their maximum size, default values, selections list options, etc.

Example:

```python
from django.db import models

class Team(models.Model):
    team_name = models.CharField(max_length=40)

    TEAM_LEVELS = (
        ('U09', 'Under 09s'),
        ('U10', 'Under 10s'),
        ('U11', 'Under 11s'),
        # List our other teams
    )
    team_level = models.CharField(max_length=3,choices=TEAM_LEVELS,default='U11')
```

## Rendering data

Web frameworks often provide templating systems that allow to specify the structure of an output element, using placeholders for data that will be added when the page is generated. Templates are often HTML pages, but could be in other formats

They also provide ways to mechanisms to make it easy to generate other data formats, such as XML and JSON.
