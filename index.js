require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const noteRouter = require('./routers/noteRouter')
const userRouter = require('./routers/authRouter')
const PORT = process.env.PORT || 5500
const app = express()
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: true,
	})
)

app.use(express.json())
app.use('/api/v1', userRouter)
app.use('/api/v1', noteRouter)

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
		app.listen(PORT, () => console.log(`Server working`))
	} catch (error) {
		console.log(error)
	}
}

startServer()
