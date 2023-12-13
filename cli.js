require('dotenv').config();
const { Sequelize } = require('sequelize');
const Blog = require('./models/blog'); 

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("Executing (default): SELECT * FROM blogs");

        const blogs = await Blog.findAll();
        blogs.forEach(blog => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
        });

        await sequelize.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
