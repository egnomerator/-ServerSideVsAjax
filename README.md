# ThreeTablesServerVsJqueryVsReact

An application as a tool to facilitate teaching development topics related to (and not limited to) full stack web development.

This is an ASP.NET Core MVC web app that implements or plans to implement the following (this list is likely to expand)

- software architecture
	- the design is very simplistic now, to reduce cognitive overload
	- planned:
		- a tiered architecture design
- data
	- in-memory collection of developers as a data layer backing a front-end table providing CRUD operations
	- planned:
		- create an interface that this in-memory collection implements
		- add other implementations of this common interface
			- using entity framework 
			- using ADO.NET
- server
	- currently just provides the APIs to support the web client
		- non-API Controller; intended for preparing the Razor views
		- API Controller - RESTful; intended for the Ajax calls
	- planned: add a business layer
		- both controllers will depend on the business layer
		- will add some simple business rules and implement in this layer
- UI
	- server-side rendering via Razor
	- client-side rendering via jQuery (using Ajax)
	- client-side rendering via Reactjs (using Ajax)

## topics to cover (this list is likely to expand)

notes on topics

- asterisk means already covered to some extent
- all topics are intended to be discussed at legnth and revisited repeatedly throughout the teaching sessions
- the intenion is to ease into topics by introducing them and going deeper into topics as it makes sense throughout collaboration on building this app

the topics

- .NET
	- *.NET Core framework
	- *ASP.NET Core MVC libraries
	- *.NET Core web app lifecycle (program, startup, configuring services and IoC, configuring the HTTP pipeline)
	- *framework conventions (naming Controllers, folders, views, folder structure, etc.)
	- *Razor views
	- extensibility
- HTTP
	- *HTTP verbs, resources
	- *REST
	- *URL, query string, form submit, request body
	- *view raw request data in Fiddler; request format; headers, compare GET vs. POST, see request body
- Web
	- *HTML, CSS, JavaScript
	- *jQuery
	- *Ajax
	- React
	- modern JS tooling (modules, webpack, NPM, babel, JSX, TypeScript, tsc, etc.)
- C#
	- *namespace, using statements, project references, nuget packages
	- types, value vs. reference types, class, members, access modifiers
	- inheritance, interfaces
	- exceptions and exception handling
	- garbage collection
- Design Principles
	- APIE, SOLID, GRASP, etc.
