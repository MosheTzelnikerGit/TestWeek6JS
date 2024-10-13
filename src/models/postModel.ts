import { timeStamp } from "console";
import mongoose, { Schema, Document, Types } from "mongoose";




export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
}

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: [true, "Comments is required"],
    minlength: [1, "Comments must not be empety"],
    maxlength: [1000, "Comment cannot exceed 1000 chars"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required:[true, "Title is required"],
    minlength:[3, "Title must be at least 3 chars"],
    maxlength: [100,"Title must not exceed 100 chars!%"],
  },
  content: {
    type: String,
    required:[true, "Content is required!"],
    minlength:[10,"Content must be at least 10 chars long!"],
    maxlength:[1000,"Content must not exceed 1000 chars"],
  },
  author: {
    type: Schema.Types.ObjectId, ref:"User", required:true
  },
  comments: [CommentSchema],
});

export default mongoose.model<IPost>("Post", PostSchema);

