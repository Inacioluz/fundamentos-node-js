import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { bioldRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: bioldRoutePath ('/users'),
    handler: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: bioldRoutePath ('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: bioldRoutePath ('/users/:id'),
    handler: (req, res) => {
        return res.end()
    }
  }
]