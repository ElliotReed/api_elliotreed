export default interface ErrorResponse {
  status: "error"
  message: string
  data: unknown
}