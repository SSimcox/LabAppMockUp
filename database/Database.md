#Database layout  
###Users  
+ id (integer) SERIAL PRIMARY KEY
+ name (text)
+ number (integer)

###Tutors
+ id (integer) SERIAL PRIMARY KEY
+ name (text)
+ number (integer)
+ password (text)

###Classes  
+ id (integer) SERIAL PRIMARY KEY
+ number (integer)
+ name (text)
+ teachers (text[])

###Tutor Sessions  
+ id (integer) SERIAL PRIMARY KEY
+ anumber (integer)
+ date (date)
+ time (time)
+ problem description (text)
+ problem solution (text)
+ tutorid (integer)