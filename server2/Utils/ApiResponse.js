class APIResponse {
    constructor(stausCode , data , message = "success") {
        this.stausCode = stausCode;
        this.data = data;
        this.message = message;
        this.success = stausCode >= 200 && stausCode < 300; 
    }
}

export {APIResponse} 