import { Schema, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)