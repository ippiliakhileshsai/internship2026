ERROR 1046 (3D000): No database selected
mysql> USE library_management;
Database changed
mysql> SELECT DATABASE();
+--------------------+
| DATABASE()         |
+--------------------+
| library_management |
+--------------------+
1 row in set (0.00 sec)

mysql>  CREATE TABLE students (
    ->     ->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     ->     name VARCHAR(100) NOT NULL,
    ->     ->     email VARCHAR(100) UNIQUE,
    ->     ->     phone VARCHAR(15),
    ->     ->     department VARCHAR(50),
    ->
    ->
    -> );
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) N' at line 2
mysql> CREATE TABLE students (
    ->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     email VARCHAR(100) UNIQUE,
    ->     phone VARCHAR(15),
    ->     department VARCHAR(50),
    ->     year_of_study INT
    -> );
Query OK, 0 rows affected (0.76 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| students                     |
+------------------------------+
1 row in set (0.00 sec)

mysql> CREATE TABLE faculty (
    ->     faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     email VARCHAR(100) UNIQUE,
    ->     phone VARCHAR(15),
    ->     department VARCHAR(50),
    ->     designation VARCHAR(50)
    -> );
Query OK, 0 rows affected (0.52 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| faculty                      |
| students                     |
+------------------------------+
2 rows in set (0.00 sec)

mysql> CREATE TABLE books (
    ->     book_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     title VARCHAR(100) NOT NULL,
    ->     author VARCHAR(100) NOT NULL,
    ->     isbn VARCHAR(20) UNIQUE,
    ->     category VARCHAR(50),
    ->     quantity INT NOT NULL,
    ->     available INT NOT NULL
    -> );
Query OK, 0 rows affected (1.50 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| students                     |
+------------------------------+
3 rows in set (0.00 sec)

mysql> CREATE TABLE issued_books (
    ->     issue_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     book_id INT,
    ->     student_id INT,
    ->     issue_date DATE,
    ->     due_date DATE,
    ->     return_date DATE,
    ->     FOREIGN KEY (book_id) REFERENCES books(book_id),
    ->     FOREIGN KEY (student_id) REFERENCES students(student_id)
    -> );
Query OK, 0 rows affected (2.10 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| issued_books                 |
| students                     |
+------------------------------+
4 rows in set (0.06 sec)

mysql> CREATE TABLE reservations (
    ->     reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     book_id INT,
    ->     student_id INT,
    ->     reservation_date DATE,
    ->     status VARCHAR(20),
    ->     FOREIGN KEY (book_id) REFERENCES books(book_id),
    ->     FOREIGN KEY (student_id) REFERENCES students(student_id)
    -> );
Query OK, 0 rows affected (1.43 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| issued_books                 |
| reservations                 |
| students                     |
+------------------------------+
5 rows in set (0.00 sec)

mysql>  INSERT INTO books (title, author, isbn, category, quantity, available)
    -> VALUES ('Python Programming', 'Guido van Rossum', '9781234567890', 'Programming', 5, 5);
Query OK, 1 row affected (0.17 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql>
mysql> INSERT INTO students (name, email, phone, department, year_of_study)
    -> VALUES ('Divya', 'divya@gmail.com', '9876543210', 'Computer Science', 3)
    -> ;
Query OK, 1 row affected (0.11 sec)

mysql> SELECT * FROM student;
ERROR 1146 (42S02): Table 'library_management.student' doesn't exist
mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> INSERT INTO faculty (name, email, phone, department, designation)
    -> VALUES ('Dr. Swathi', ' Swathi@college.edu', '9876543211', 'Computer Science', 'Professor');
Query OK, 1 row affected (0.10 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> INSERT INTO issued_books (book_id, student_id, issue_date, due_date, return_date)
    -> VALUES (1, 1, '2026-06-20', '2026-07-04', NULL);
Query OK, 1 row affected (0.16 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> INSERT INTO reservations (book_id, student_id, reservation_date, status)
    -> VALUES (1, 1, '2026-06-20', 'Pending');
Query OK, 1 row affected (0.04 sec)

mysql> SELECT * FROM reservations;
+----------------+---------+------------+------------------+---------+
| reservation_id | book_id | student_id | reservation_date | status  |
+----------------+---------+------------+------------------+---------+
|              1 |       1 |          1 | 2026-06-20       | Pending |
+----------------+---------+------------+------------------+---------+
1 row in set (0.00 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM reservations;
+----------------+---------+------------+------------------+---------+
| reservation_id | book_id | student_id | reservation_date | status  |
+----------------+---------+------------+------------------+---------+
|              1 |       1 |          1 | 2026-06-20       | Pending |
+----------------+---------+------------+------------------+---------+
1 row in set (0.00 sec)

mysql> m
    ->








ERROR 1046 (3D000): No database selected
mysql> USE library_management;
Database changed
mysql> SELECT DATABASE();
+--------------------+
| DATABASE()         |
+--------------------+
| library_management |
+--------------------+
1 row in set (0.00 sec)

mysql>  CREATE TABLE students (
    ->     ->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     ->     name VARCHAR(100) NOT NULL,
    ->     ->     email VARCHAR(100) UNIQUE,
    ->     ->     phone VARCHAR(15),
    ->     ->     department VARCHAR(50),
    ->
    ->
    -> );
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) N' at line 2
mysql> CREATE TABLE students (
    ->     student_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     email VARCHAR(100) UNIQUE,
    ->     phone VARCHAR(15),
    ->     department VARCHAR(50),
    ->     year_of_study INT
    -> );
Query OK, 0 rows affected (0.76 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| students                     |
+------------------------------+
1 row in set (0.00 sec)

mysql> CREATE TABLE faculty (
    ->     faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     email VARCHAR(100) UNIQUE,
    ->     phone VARCHAR(15),
    ->     department VARCHAR(50),
    ->     designation VARCHAR(50)
    -> );
Query OK, 0 rows affected (0.52 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| faculty                      |
| students                     |
+------------------------------+
2 rows in set (0.00 sec)

mysql> CREATE TABLE books (
    ->     book_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     title VARCHAR(100) NOT NULL,
    ->     author VARCHAR(100) NOT NULL,
    ->     isbn VARCHAR(20) UNIQUE,
    ->     category VARCHAR(50),
    ->     quantity INT NOT NULL,
    ->     available INT NOT NULL
    -> );
Query OK, 0 rows affected (1.50 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| students                     |
+------------------------------+
3 rows in set (0.00 sec)

mysql> CREATE TABLE issued_books (
    ->     issue_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     book_id INT,
    ->     student_id INT,
    ->     issue_date DATE,
    ->     due_date DATE,
    ->     return_date DATE,
    ->     FOREIGN KEY (book_id) REFERENCES books(book_id),
    ->     FOREIGN KEY (student_id) REFERENCES students(student_id)
    -> );
Query OK, 0 rows affected (2.10 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| issued_books                 |
| students                     |
+------------------------------+
4 rows in set (0.06 sec)

mysql> CREATE TABLE reservations (
    ->     reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     book_id INT,
    ->     student_id INT,
    ->     reservation_date DATE,
    ->     status VARCHAR(20),
    ->     FOREIGN KEY (book_id) REFERENCES books(book_id),
    ->     FOREIGN KEY (student_id) REFERENCES students(student_id)
    -> );
Query OK, 0 rows affected (1.43 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_library_management |
+------------------------------+
| books                        |
| faculty                      |
| issued_books                 |
| reservations                 |
| students                     |
+------------------------------+
5 rows in set (0.00 sec)

mysql>  INSERT INTO books (title, author, isbn, category, quantity, available)
    -> VALUES ('Python Programming', 'Guido van Rossum', '9781234567890', 'Programming', 5, 5);
Query OK, 1 row affected (0.17 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql>
mysql> INSERT INTO students (name, email, phone, department, year_of_study)
    -> VALUES ('Divya', 'divya@gmail.com', '9876543210', 'Computer Science', 3)
    -> ;
Query OK, 1 row affected (0.11 sec)

mysql> SELECT * FROM student;
ERROR 1146 (42S02): Table 'library_management.student' doesn't exist
mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> INSERT INTO faculty (name, email, phone, department, designation)
    -> VALUES ('Dr. Swathi', ' Swathi@college.edu', '9876543211', 'Computer Science', 'Professor');
Query OK, 1 row affected (0.10 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> INSERT INTO issued_books (book_id, student_id, issue_date, due_date, return_date)
    -> VALUES (1, 1, '2026-06-20', '2026-07-04', NULL);
Query OK, 1 row affected (0.16 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> INSERT INTO reservations (book_id, student_id, reservation_date, status)
    -> VALUES (1, 1, '2026-06-20', 'Pending');
Query OK, 1 row affected (0.04 sec)

mysql> SELECT * FROM reservations;
+----------------+---------+------------+------------------+---------+
| reservation_id | book_id | student_id | reservation_date | status  |
+----------------+---------+------------+------------------+---------+
|              1 |       1 |          1 | 2026-06-20       | Pending |
+----------------+---------+------------+------------------+---------+
1 row in set (0.00 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM books;
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
| book_id | title              | author           | isbn          | category    | quantity | available |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
|       1 | Python Programming | Guido van Rossum | 9781234567890 | Programming |        5 |         5 |
+---------+--------------------+------------------+---------------+-------------+----------+-----------+
1 row in set (0.00 sec)

mysql> SELECT * FROM students;
+------------+-------+-----------------+------------+------------------+---------------+
| student_id | name  | email           | phone      | department       | year_of_study |
+------------+-------+-----------------+------------+------------------+---------------+
|          1 | Divya | divya@gmail.com | 9876543210 | Computer Science |             3 |
+------------+-------+-----------------+------------+------------------+---------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM faculty;
+------------+------------+---------------------+------------+------------------+-------------+
| faculty_id | name       | email               | phone      | department       | designation |
+------------+------------+---------------------+------------+------------------+-------------+
|          1 | Dr. Swathi |  Swathi@college.edu | 9876543211 | Computer Science | Professor   |
+------------+------------+---------------------+------------+------------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM issued_books;
+----------+---------+------------+------------+------------+-------------+
| issue_id | book_id | student_id | issue_date | due_date   | return_date |
+----------+---------+------------+------------+------------+-------------+
|        1 |       1 |          1 | 2026-06-20 | 2026-07-04 | NULL        |
+----------+---------+------------+------------+------------+-------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM reservations;
+----------------+---------+------------+------------------+---------+
| reservation_id | book_id | student_id | reservation_date | status  |
+----------------+---------+------------+------------------+---------+
|              1 |       1 |          1 | 2026-06-20       | Pending |
+----------------+---------+------------+------------------+---------+
1 row in set (0.00 sec)

mysql> m
    ->


































































































