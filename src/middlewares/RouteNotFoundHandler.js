
export const RouteNotFound = (req, res) => {
  return res.status(200).json({ message: "Route Not found." })
}