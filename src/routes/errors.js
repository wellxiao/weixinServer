class HttpError extends Error {

    /**
     * Creates an instance of HttpError
     *
     * @param {Number} status
     * @param {String} [message]
     */
    constructor(status, message) {
        super(message);
        this.status = status;
    }

}

class BadRequest extends HttpError {

    /**
     * Creates an instance of BadRequest
     *
     * @param {String} [message]
     * @memberof BadRequest
     */
    constructor(message) {
        super(400, message || '错误请求');
    }

}

class Unauthorized extends HttpError {

    /**
     * Creates an instance of Unauthorized
     *
     * @param {String} [message]
     * @memberof Unauthorized
     */
    constructor(message) {
        super(401, message || '未授权');
    }

}

class Forbidden extends HttpError {

    /**
     * Creates an instance of Forbidden
     *
     * @param {String} [message]
     * @memberof Forbidden
     */
    constructor(message) {
        super(403, message || '禁止');
    }

}

class NotFound extends HttpError {

    /**
     * Creates an instance of NotFound
     *
     * @param {String} [message]
     * @memberof NotFound
     */
    constructor(message) {
        super(404, message || '未找到');
    }

}

class Conflict extends HttpError {

    /**
     * Creates an instance of Conflict
     *
     * @param {String} [message]
     * @memberof Conflict
     */
    constructor(message) {
        super(409, message || '冲突');
    }

}

class Expired extends HttpError {

    /**
     * Creates an instance of Expired
     *
     * @param {String} [message]
     * @memberof Expired
     */
    constructor(message) {
        super(410, message || '过期');
    }

}

class NotImplemented extends HttpError {

    /**
     * Creates an instance of NotImplemented
     *
     * @param {String} [message]
     * @memberof NotImplemented
     */
    constructor(message) {
        super(501, message || '不支持');
    }

}

module.exports = {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    Conflict,
    Expired,
    NotImplemented
};
