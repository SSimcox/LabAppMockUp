DROP DATABASE IF EXISTS spring2017;

CREATE DATABASE spring2017;

\c spring2017;

CREATE TABLE students(
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    a_number INTEGER,
    class_list VARCHAR[][],
    tutor BOOLEAN,
    password VARCHAR
);

CREATE TABLE queue(
    ID SERIAL PRIMARY KEY,
    student_name VARCHAR,
    class VARCHAR[],
    added_to_queue TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE admins(
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    a_number INTEGER,
    password VARCHAR
);

CREATE TABLE active_students(
    ID SERIAL PRIMARY KEY,
    student_id INTEGER UNIQUE,
    is_tutor BOOLEAN NOT NULL,
    logged_in TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE active_tutors(
    ID SERIAL PRIMARY KEY,
    student_id INTEGER,
    logged_in TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE traffic_table(
    ID SERIAL PRIMARY KEY,
    student_id INTEGER,
    class_name VARCHAR,
    time_in TIMESTAMPTZ,
    time_out TIMESTAMPTZ DEFAULT current_timestamp
);



INSERT INTO students (name,a_number, class_list, tutor, password) VALUES('Steven Simcox', 01186010, '{{"CS 5410-001","Computer Graphics II","Kenneth Sundberg"},{"CS 3450-003","Software Engineering","Amanda Hughes"},{"CS 4700-001","Some CS Class","Haitao Wang"}}' ,true,'tutors');
INSERT INTO students (name,a_number, tutor) VALUES('Kati Simcox', 55555, false);
