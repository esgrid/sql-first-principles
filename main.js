const db = require('./db')

async function main () {
    //drop existing stuff

    let queries = []

    queries.push(`
    DROP TABLE IF EXISTS books;
    `)

    await db.query(queries[0])

    queries.push(`
    /* create table if it doesn't exist */
     CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        author TEXT,
        title TEXT NOT NULL,
        subject TEXT,
        read INTEGER DEFAULT 0,
        times_read INTEGER DEFAULT 0 
    );
    `)
    // creating table if not exists
    await db.query(queries[1])
    
    queries.push( `
    INSERT INTO books (author, title, subject) VALUES
    ("Peter Harrison", "The Territories of Science and Religion", "History");
    `)

    await db.query(queries[2])

    queries.push(`
    INSERT INTO books (author, title, subject) VALUES
    ("Martin Heidegger", "Being and Time", "Philosophy");
    `)

    await db.query(queries[3])

    queries.push(`
    INSERT INTO books (author, title, subject) VALUES
    ("Rita Felski", "The Limits of Critique", "Literary Criticism");    
    `)

    await db.query(queries[4])

    queries.push( `
    INSERT INTO books (author, title, subject) VALUES
    ("Michael Polanyi", "The Tacit Dimension", "Philosophy");
    `)

    await db.query(queries[5])

    queries.push(`
    INSERT INTO books (author, title, subject) VALUES
    ("Michael Polanyi", "Personal Knowledge", "Philosophy");
    `)

    await db.query(queries[6])

    queries.push(`
    INSERT INTO books (author, title, subject) VALUES
    ("Hans-Georg Gadamer", "The Relevance of the Beautiful", "Philosophy");    
    `)

    await db.query(queries[7])

    await db.query(`
    INSERT INTO books (author, title, subject) VALUES
    ("DC Schindler", "Plato's Critique of Impure Reason", "Philosophy");
    `)

    await db.query(`INSERT INTO books (title, subject) VALUES ("Focusing", "Philosophy and Psychology")`)

    await db.query(`UPDATE books SET author = 'D.C. Schindler', read = 1, times_read = 1 WHERE author = 'DC Schindler'`)

    await db.query(`UPDATE books SET read = 1, times_read = 1, subject = 'Metaphysics of Knowledge' WHERE title = 'Personal Knowledge'`)

    await db.query(`
    UPDATE books SET times_read = 2, read = 1
    WHERE author = 'Michael Polanyi' OR author = 'Hans-Georg Gadamer'
    `)

    await db.query(`
    UPDATE books
    SET author = 'Eugene Gendlin', read = 1, times_read = 1
    WHERE author IS NULL;
    `)

    // await db.query(`
    // DELETE FROM books
    // WHERE title = 'Personal Knowledge'
    // `)

    // await db.query(`
    // DELETE FROM books
    // WHERE times_read < 2 OR read = 0
    // `)

    // const [result, meta] = await db.query(`
    // SELECT * books;
    // `)

    // const [result, meta] = await db.query(`
    // SELECT DISTINCT author FROM books;
    // `)

    // const [result, meta] = await db.query(`
    // SELECT author, COUNT(*)
    // FROM books
    // GROUP BY author 
    // ORDER BY COUNT(*) ASC;
    // `)

    const [result, meta] = await db.query(`
    SELECT author AS 'Author', COUNT(*) AS 'Number of Books'
    FROM books
    GROUP BY 1
    ORDER BY 2 DESC;
    `)

    // more queries, used sqlite extension to try them:
    // go to command palette and type sqlite and open database
    // now create a new query via the icon
    // use that file to run queries on the database and see the results
    // rather than console logged results.

    // queries used there:
    sql = `
    UPDATE books SET times_read = 3 WHERE title = 'Personal Knowledge';

    SELECT author AS 'Author', AVG(times_read) as 'Average Books Read By Author'
    FROM books
    GROUP BY author;

    SELECT author AS 'Author', SUM(times_read) as 'Author Total Reads'
    FROM books
    GROUP BY 1
    ORDER BY 1 DESC;

    SELECT title as 'Title', MAX(times_read) as 'Title most read'
    FROM books;
    `

    console.log(result)


}

main()
