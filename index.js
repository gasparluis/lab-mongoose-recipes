const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
   })
  
  .then(() => {
      console.log("Connection success!");
      updateDatabase();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  //create
  async function updateDatabase() {
    try {
    const receipeCreated = await Recipe.create({
      title: "Pasta Pesto",
      level: "Easy Peasy",
      ingredients: ["Pasta", "Pesto", "Mangericao", "Pinhao", "Azeite"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "",
      duration: 10,
      creator: "Stefano",
      created: "",
    });
    console.log(receipeCreated.title);

    await Recipe.insertMany(data)

    data.forEach(element => {
      console.log(element.title)
    })


    await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, 
    {duration: 100,});
  
    await Recipe.deleteOne({ title: "Carrot Cake"
    });
    console.log("sucess", Recipe.deleteOne)

  } catch (e) {
    console.log("error occurred", e);
  } finally {
    mongoose.connection.close();
  }
}