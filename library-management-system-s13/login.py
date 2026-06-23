import mysql.connector

conn = mysql.connector.connect(host="localhost", user="root", password="mysql@library2026", database="library_management")
cursor = conn.cursor()

uid = input("Enter ID: ")
pwd = input("Enter password: ")

cursor.execute("SELECT role FROM users WHERE username=%s AND password=%s", (uid, pwd))
row = cursor.fetchone()

print("Login success! Role:", row[0]) if row else print("Invalid ID or password")

cursor.close()
conn.close()