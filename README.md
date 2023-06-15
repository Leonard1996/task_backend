## How to change the code to support different file format versions?

I have inclused a parser class and an init function, depending on the extension of the file
it is going to run the appropirate function on startup.

## How will the import system change if in the future we need to get this data from a web API?

The init function will not read data from file, instead it is going to call the web api, ex via http, and then parse the data

## If in the future it will be necessary to do the calculations using the national bank rate, how could this be added to the system?

For this we might take different approaches, given that the bank rates dont change too often, we can do a service to serve as a crone job, to fetch data from some bank api edhe insert it into our db. In the core of this implementation will be the call of the bank api and inserting/updating db.

## How would it be possible to speed up the execution of requests if the task allowed you to update market data once a day or even less frequently?

The only thing that comes to mind here is some caching mechanism, insert into memeroy cache data once a day or so. Maybe this might be useful for future functionalities but for functionalities that I have implemented I can't see an easy way to implement caching since the ask value can't be cached as it changes everytime.
