const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise-1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Error :" + err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
    return await Course
        .find({ isPublished: true, tags: { $in: ["frontend", "backend"] } })
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourse();
    console.log(courses);
}

run();