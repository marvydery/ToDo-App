import dotenv from 'dotenv';
import express from 'express';
import todoModel from './Schema/schema.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

//const PORT = 3000;
dotenv.config();
//middlewares to use
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

const db = process.env.DB_URL;

mongoose.connect(db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(
    () => console.log('==> Connected to mad-todos DB on MongoDB <==')
).catch(err => console.log(err));
//CRUD - create, read, update, delete
//get() 

//home route
app.get('/', (req,res) => {
    //req is request
    // res is respond
    res.json(
        {message:'Welcome To MAD ToDo Backend API'});
})

//Get All To Dos
app.get('/todos', async (req,res) => {
    const allTodos = await todoModel.find({});
     if(allTodos){
        //when it is successful
        return res.status(200).json(
            {message: `Todos fetched successfully`,
                data: allTodos
            });
     } else {
        //when there is an error
        return res.status(500).json(
            {message: `Ooops!, Unable to fetch todos`

            });
     }
})

//Get all category Todos
app.get('/todos/:category', async (req,res) => {
    const {category} = req.params;
    //const category = req.params.category;
    const allCategoryTodos = await todoModel.find({})
    .where("category").equals(category)

    if(allCategoryTodos){
        //when it is successful
        return res.status(200).json(
            {message: `${category} fetched successfully`,
                data: allCategoryTodos
            })
     } else {
        //when there is an errorl
        return res.status(500).json(
            {message: `Ooops!, Unable to fetch ${category} todos`

            })
     }
    })

     //Creating a new todos model
     app.post('/todo', async (req,res) => {
        const {todoTitle, category} = req.body;
        const newTodo = await todoModel.create(
            {
                todoTitle,
                category,
            }
        );
        //successs
     if(newTodo){
        return res.status(200).json (
            {
            message: 'Todo created successfully',
            //data: newTodo
        }
        )
     } else {
         return res.status(500).json(
             {
                 message: 'Error creating todo'
            }
         )

     }
     })

     //delete a todos
     app.delete('/todo/:id', async (req,res) => {
         const {id} = req.params;
         const deletedTodo = await todoModel.findByIdAndDelete(id);
         if (deletedTodo) {
            //success
            return res.status(200).json(
                {
                    message: 'Todo deleted successfully'
                }
            )
         }else{ 
             //error
             return res.status(500).json(
                 {
                     message: 'Error deleting todo'
                }
             )

         }
     }

     )
     



















































































app.listen((PORT),
    () => {
        console.log(`The localhost server is up and running AT Port: ${PORT}`);
    }
);