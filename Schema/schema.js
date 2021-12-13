import mongoose from 'mongoose';
const {Schema, model} = mongoose; // Destructuring
//Use Schema to structure the data in the database 
const todoSchema = Schema (
{
    todoTitle: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required:true,
    },
}
)

const todoModel = model('mad-todos', todoSchema);

export default todoModel;
//types of exports
//1. default export
//2. named exports
//export {TodoModel as TodoModel};
