export const handleError = (error, res) => {
    res.status(500).json({
      message: 'An error ocurred',
      error: error.toString()
    })
  }
 export const server = "http://localhost"