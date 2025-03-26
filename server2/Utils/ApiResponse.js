class APIResponse {
    constructor(staus, data, message = 'success') {
        this.staus = staus;
        this.data = data;
        this.message = message;
        this.success = staus >= 200 && staus < 300;
    }
}

export { APIResponse };
