class CommoError {
  static build(message, status) {
    return {
      erro: true,
      message,
      status,
      

    };
  }
}
export {CommoError}