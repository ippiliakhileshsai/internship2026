import mysql.connector

def search_books(keyword):
    conn = mysql.connector.connect(
        host="localhost", 
        user="root", 
        password="mysql@library2026", 
        database="library_management"
    )
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT book_id, title, author FROM books WHERE title LIKE %s", (f"%{keyword}%",))
    
    for book in cursor.fetchall():
        print(f"{book['book_id']} | {book['title']} | {book['author']}")
    
    conn.close()

search_books(input("Search book: "))