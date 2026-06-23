import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql@library2026",
    database="library_management"
)
cursor = conn.cursor()

# Create books table if not exists
cursor.execute("CREATE TABLE IF NOT EXISTS books(book_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), author VARCHAR(100), quantity INT)")
conn.commit()

def add_book():
    title = input("Book Title: ")
    author = input("Author: ")
    qty = int(input("Quantity: "))
    cursor.execute("INSERT INTO books(title, author, quantity) VALUES(%s,%s,%s)", (title, author, qty))
    conn.commit()
    print("Book Added ✅")

def view_books():
    cursor.execute("SELECT book_id, title, author, quantity FROM books")
    print("\nID | Title | Author | Qty")
    for row in cursor.fetchall():
        print(f"{row[0]} | {row[1]} | {row[2]} | {row[3]}")

def delete_book():
    bid = input("Enter Book ID to delete: ")
    cursor.execute("DELETE FROM books WHERE book_id=%s", (bid,))
    conn.commit()
    print("Deleted ✅")

while True:
    print("\n1.Add Book 2.View Books 3.Delete Book 4.Exit")
    ch = input("Choice: ")
    if ch == "1": add_book()
    elif ch == "2": view_books()
    elif ch == "3": delete_book()
    elif ch == "4": break
    else: print("Invalid")

cursor.close()
conn.close()