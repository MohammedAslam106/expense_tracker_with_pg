
export const profile=
`
    CREATE TABLE profile_picture(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        image TEXT NOT NULL
    );
`
export const user=`CREATE TABLE "user"(                          
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password text NOT NULL UNIQUE,
    dob DATE,
    image UUID REFRENCES profile_picture(id) NOT NULL
);`

// In the above query we have used user in qoutes because user in reserved key word in psql.

export const categories=`CREATE TABLE categories(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES "user"(id) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL
);`


export const expenses=`CREATE TABLE expenses(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES "user"(id) NOT NULL,
    total_amount INT NOT NULL,
    paid_amount INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT
    );`

export const categories_expenses=`CREATE TABLE categories_expenses(
    expense_id UUID REFERENCES expenses(id),
    category_id UUID REFERENCES categories(id),
    PRIMARY KEY(expense_id,category_id)
);`
    // categories UUID[] REFERENCES categories(id)  -->This is not possible we have to create another table name junction table which will defined the many to many relations between two tables
