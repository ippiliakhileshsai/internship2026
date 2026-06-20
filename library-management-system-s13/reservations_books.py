import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql@library2026",
    database="library_management"
)

cursor = conn.cursor()

book_id = input("Enter Book ID to reserve: ")

sql = "INSERT INTO reservations (book_id, status) VALUES (%s, 'reserved')"
cursor.execute(sql, (book_id,))
conn.commit()

print("Book reserved successfully!")

cursor.close()
conn.close()