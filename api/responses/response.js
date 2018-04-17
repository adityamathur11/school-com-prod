/**
 * Created by aditya on 17/4/18.
 */
var ResponseCodes = {
    ResourceConflict : {
        code : 409,
        message : {
            message : "Resource Conflict"
        }
    },
    InvalidParameters : {
        code : 403,
        message : {
            message : "Invalid Parameters"
        }
    },
    NoToken : {
        code : 401,
        message : {
            message : "Authorization Token Required"
        }
    },
    InvalidToken : {
        code : 401,
        message :{
            message : "Invalid Authorization Token"
        }
    },
    TokenExpired : {
        code : 401,
        message : {
            message : "Token Expired"
        }
    },
    InternalServerError :  {
        code : 500,
        message : {
            message : "Internal Server Error"
        }
    },
    InvalidCredentials : {
        code : 401,
        message : {
            message : "Inavild Credentials"
        }
    },

    ResourceNotFound : {
        code : 404,
        message : {
            message : 'Resource Not Found'
        }
    },
    Success : {
        code : 200,
        message : {
            message : "Success"
        }
    },
    Created : {
        code : 201,
        message : {
            message : "Resource Created"
        }
    },
    Deleted : {
        code : 204
    },
    Forbidden : {
        code : 403,
        message : {
            message : "Forbidden Access"
        }
    }
};

module.exports = ResponseCodes;