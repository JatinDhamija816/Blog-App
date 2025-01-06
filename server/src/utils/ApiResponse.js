class ApiResponse {
  constructor(statusCode, data, message = "Success", metadata = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
    this.metadata = metadata;
  }
}

export default ApiResponse;
