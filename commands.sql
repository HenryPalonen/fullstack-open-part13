CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);


INSERT INTO blogs (author, url, title, likes) VALUES ('Author Name 1', 'http://example.com/blog1', 'Blog Title 1', 10);
INSERT INTO blogs (author, url, title, likes) VALUES ('Author Name 2', 'http://example.com/blog2', 'Blog Title 2', 5);
