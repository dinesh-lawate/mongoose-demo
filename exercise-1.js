const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise-1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Error: " + err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    datd: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();