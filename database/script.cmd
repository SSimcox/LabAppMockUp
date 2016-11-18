psql -U postgres -c "Drop Database spring2017"
psql -U postgres < newSemesterDBTemplate.sql
psql -U postgres < ./database/newSemesterDBTemplate.sql
pause;