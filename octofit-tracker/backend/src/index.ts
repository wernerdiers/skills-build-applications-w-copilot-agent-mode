import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/Activity.js'
import { Leaderboard } from './models/Leaderboard.js'
import { Team } from './models/Team.js'
import { User } from './models/User.js'
import { Workout } from './models/Workout.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }).lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName').sort({ name: 1 }).lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'username displayName').sort({ loggedAt: -1 }).lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'username displayName').sort({ rank: 1 }).lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean())
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on ${baseUrl}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exitCode = 1
  })