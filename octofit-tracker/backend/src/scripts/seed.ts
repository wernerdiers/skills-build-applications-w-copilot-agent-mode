import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya.runner', email: 'maya@example.com', displayName: 'Maya Runner' },
      { username: 'liam.lifter', email: 'liam@example.com', displayName: 'Liam Lifter' },
      { username: 'zoe.walker', email: 'zoe@example.com', displayName: 'Zoe Walker' },
    ]);

    await Team.create([
      { name: 'Peak Performers', motto: 'Small steps, strong finish', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', motto: 'Keep moving together', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.2, points: 52, loggedAt: new Date('2026-09-22') },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, points: 60, loggedAt: new Date('2026-09-23') },
      { user: users[2]._id, type: 'walking', durationMinutes: 40, distanceKm: 3.4, points: 34, loggedAt: new Date('2026-09-24') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 245, rank: 1 },
      { user: users[1]._id, points: 220, rank: 2 },
      { user: users[2]._id, points: 180, rank: 3 },
    ]);

    await Workout.create([
      { title: 'Five-Minute Warmup', type: 'mobility', difficulty: 'beginner', durationMinutes: 5, description: 'Dynamic movements to prepare for activity.' },
      { title: 'Core Builder', type: 'strength', difficulty: 'intermediate', durationMinutes: 20, description: 'A focused bodyweight routine for core stability.' },
      { title: 'Hill Repeats', type: 'running', difficulty: 'advanced', durationMinutes: 30, description: 'Short uphill efforts with easy recovery intervals.' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
