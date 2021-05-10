## Description
Job Vacancy management backend project, using Nest framework TypeScript.


**Stories:**
1. A company has a name and address
2. A company can have multiple job vacancies
3. A company has many users
4. A vacancy has a title, description, expiredAt (datetime)
5. A user has a name, username, password
6. A user belongs to one company only
7. A user can have two types of roles: user and admin
8. A user with an admin role can view, create, edit, and delete vacancies
9. A user without an admin role can view job vacancies only
10. A user has to login first before doing any operation


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#Description"> Description</a></li>
    <li><a href="#Design">Design</a></li>
    <li><a href="#Config">Config</a></li>
    <li><a href="#Unit-Test">Unit-Test</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#API-usage-and-running-results">API usage and running results</a></li>
  </ol>
</details>


## Design
**Technology stack**：Node.js(Nest.js) + typescript + mongodb，REST & GraphQL

**Design**: By analysing the stories, JobVacancy application is decoupled into three micro-services. One for Auth, since Auth are seperated requirements with other business-related features. Also, considering the high volume of query, availability and low latency can be issues. Thus, queries(read DB) activity and management(for create/ delete/edit DB) activities are separated into two services. In total, JobVacancy application has 3 micro-services,

1. auth
2. vacancy-manage
3. vacancy-query

To satisfy the authorization requirement, SWT token are implemented. Every time when a request comes, **AuthMiddleware** will be called before the route handler. If current user having the permission to do the requested operations, then next. Otherwise, return code 401 in response.



## Config
Each service holding a **.env** file like below，edit PORT and TOKEN_EXPIRE on demand. 

```
DB_HOST=localhost
DB_PORT=27017
DB_DBNAME=admin
DB_USER=sa
DB_PWD=sa
PORT=3001
TOKEN_EXPIRE=1h
TOKEN_SECRET=secrete_blahh
```

## Running the app
In JobVacancy folder, run below command in CLI
```
./JobVacancy$ docker-compose up build
```
It will run 4 services(1. mongo_local, 2. vacancy_auth, 3. vacancy_manage, 4. vacancy_query) after images are created.

## Unit Test
$ npm run test

![image](https://user-images.githubusercontent.com/13676113/117573450-39fc4700-b11b-11eb-86a5-90a9edad3525.png)
![image](https://user-images.githubusercontent.com/13676113/117573699-c824fd00-b11c-11eb-9775-60f46346993e.png)


## API usage and running results

**5.1 Login**

**5.1.1 Login with admin**

After successfully login, it will return a toekn which will be used in futher authorization.This token will be expired in 1h by default.
```
Post http://localhost:3001/login/

{
	"username":"admin",
	"password":"admin"
}

```
Example return 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwMDA3NjQ1LCJleHAiOjE2MjAwMTEyNDV9.A9PzaxoHxAGFIi1DHojKIgPeswxAqNAVC0MoD5yCJ6E

```
**5.1.2 Login with user**

```
Post http://localhost:3001/login/

{
	"username":"user",
	"password":"user"
}
```

**5.2 Get Vacancies List**

For user & admin, they both have the permission to view job vacancies.
```
Post http://localhost:3002/graphql

Authorization:
[{"key":"Authorization","value":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwMDA3NjQ1LCJleHAiOjE2MjAwMTEyNDV9.A9PzaxoHxAGFIi1DHojKIgPeswxAqNAVC0MoD5yCJ6E"}]


query{
    vacancy(publishedBy:{username:"admin"})
    {
         title
        description
        expireAt
        publishedBy{
            username
        }
        company{
            name
            address
        }
    }
}
```
Example return 
```
{
    "data": {
        "vacancy": [
            {
                "title": "Full Stack Developer 4",
                "description": "Some description of PredictiveHire",
                "expireAt": "1622332800000",
                "publishedBy": {
                    "username": "admin"
                },
                "company": {
                    "name": "PredictiveHire",
                    "address": "Level/5/111 Cecil St, South Melbourne VIC 3205"
                }
            },
            {
                "title": "Full Stack Developer 1",
                "description": "Some description of PredictiveHire",
                "expireAt": "1622332800000",
                "publishedBy": {
                    "username": "admin"
                },
                "company": {
                    "name": "PredictiveHire",
                    "address": "Level/5/111 Cecil St, South Melbourne VIC 3205"
                }
            }
        ]
    }
}
```
Screenshot:

![image](https://user-images.githubusercontent.com/13676113/117567097-be3fd180-b0fd-11eb-9fe8-4fabfbf42b2c.png)

**5.3 Add a vacancy**

***5.3.1 Admin able to add a vacancy***

Only admin has the permission to add a vacancy.
```
POST http://localhost:3000/vacancy

Authorization:
[{"key":"Authorization","value":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwMDA3NjQ1LCJleHAiOjE2MjAwMTEyNDV9.A9PzaxoHxAGFIi1DHojKIgPeswxAqNAVC0MoD5yCJ6E"}]

{
	"title":"Full Stack Developer 4",
	"description":"Some description of PredictiveHire",
	"expireAt":"2021-05-30",
	"company":"608df254c22ac31ad49c8529" 
}

Key [company] is optional
```
Screenshot:
![image](https://user-images.githubusercontent.com/13676113/116836207-fbd9c180-ac08-11eb-9b56-75610ffa4172.png)

***5.3.2 UNAUTHORIZED user to add a vacancy***

When a unauthorized user try to add a vacancy, it will get 401 response. Same for delete/edit vacancy.
![image](https://user-images.githubusercontent.com/13676113/117573087-6b741300-b119-11eb-8663-b734e71c5f1e.png)


**5.4 Delete a vacancy**
```
DELETE http://localhost:3000/vacancy/vacancyID

Authorization:
[{"key":"Authorization","value":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwMDA3NjQ1LCJleHAiOjE2MjAwMTEyNDV9.A9PzaxoHxAGFIi1DHojKIgPeswxAqNAVC0MoD5yCJ6E"}]
```

Screenshot:

![image](https://user-images.githubusercontent.com/13676113/116836207-fbd9c180-ac08-11eb-9b56-75610ffa4172.png)


**5.5 Edit a vacancy**
```
POST http://localhost:3000/vacancy

Authorization:
[{"key":"Authorization","value":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjIwMDA3NjQ1LCJleHAiOjE2MjAwMTEyNDV9.A9PzaxoHxAGFIi1DHojKIgPeswxAqNAVC0MoD5yCJ6E"}]

{
	"id":"608e58b51b9f421ee8ab131f",
	"title":"DevOps",
	"description":"Some description of PredictiveHire",
	"expireAt":"2021-05-30",
	"company":"608df254c22ac31ad49c8529"
}

Key [company] is optional
```

Postman & MongoDB Screenshot:

![image](https://user-images.githubusercontent.com/13676113/116851303-7ddfdf80-ac35-11eb-9897-bec7709e0bd3.png)



