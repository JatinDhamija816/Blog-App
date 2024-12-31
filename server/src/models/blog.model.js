import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: 100,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  { timestamps: true }
);

blogSchema.plugin(mongooseAggregatePaginate);

blogSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

blogSchema.index({ tags: 1 });
blogSchema.index({ owner: 1 });

const Blog = model("Blog", blogSchema);

export default Blog;
