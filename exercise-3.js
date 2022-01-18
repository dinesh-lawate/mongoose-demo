const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise-1", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => console.log("Error: " + err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    return await Course
        .find()
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .select();
}

async function run() {
    const result = await getCourses();
    console.log(result);
}

run();