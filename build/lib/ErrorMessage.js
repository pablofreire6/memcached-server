"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTSTORED = exports.SERVERERROR = exports.CLIENTERRORBADFORMAT = exports.CLIENTERROR = exports.ERROR = exports.NONEXISTINGCOMMAND = void 0;
exports.NONEXISTINGCOMMAND = 'ERROR\r\n';
exports.ERROR = 'ERROR\r\n';
exports.CLIENTERROR = 'CLIENT_ERROR bad data\r\nERROR\r\n';
exports.CLIENTERRORBADFORMAT = 'CLIENT_ERROR bad command line format\r\nERROR\r\n';
exports.SERVERERROR = 'SERVER_ERROR <error>\r\n';
exports.NOTSTORED = 'NOT_STORED\r\n';
