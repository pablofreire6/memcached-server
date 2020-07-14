"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEBUG = exports.PORT = void 0;
// =========================================
// Define PORT to be used
// =========================================
exports.PORT = parseInt(process.env.PORT) || 9000;
// =========================================
// Use log Messages to debug
// =========================================
exports.DEBUG = false;
