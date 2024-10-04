const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLessons: [{ type: String }], // keep track o lesson IDs or titles
  assignments: [{ type: String }], // can store assignment details
});

module.exports = mongoose.model("Progress", progressSchema);
