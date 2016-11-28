psql -U postgres -c "Drop Database If Exists spring2017"
psql -U postgres -f ./database/newSemesterDBTemplate.sql
pause;