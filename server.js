import app from './app'

const port = 3001
app.listen(port, () => {
  console.log()
  console.log(`Listening on port ${port}`)
  console.log(`Open http://localhost:${port}`)
})
