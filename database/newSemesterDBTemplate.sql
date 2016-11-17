CREATE DATABASE spring2017;

\c spring2017;

CREATE TABLE students(
    ID SERIAL PRIMARY KEY,
    name TEXT,
    anumber INTEGER
);