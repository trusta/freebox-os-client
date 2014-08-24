'use strict';

var request = require('request');
var crypto = require('crypto');
var winston = require('winston');

/**
 * Load config of the logger
 */
var config = require('./config/logger.js').authentication;

/**
 * Define the logger
 */
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            level: config.level,
            silent: config.silent,
            colorize: true,
            timestamp: true
        })
    ]
});


/**
 * The global freebox client
 */
var freeboxOSClient;

/**
 * Save the results of requests in freeboxOSClient.app
 *
 *
 * @param  {Object} The result returned by the freebox
 */
function saveInApp(result) {
    for (var param in result) {
        freeboxOSClient.app[param] = result[param];
        logger.debug(param, ' : ', result[param]);
    }
}


/**
 * [createCallSequence description]
 *
 *
 * @param  {[type]} functions [description]
 *
 * @return {[type]}           [description]
 */
function createCallSequence(functions) {
    if (Array.isArray(functions)) {
        var sequence;
        functions.reverse().forEach(function(func) {
            if (func instanceof Function) {
                sequence = {
                    func: func,
                    param: sequence
                };
            }
        });
        return function() {
            sequence.func(sequence.param);
        };
    } else {
        return {
            next: functions
        };
    }
}


/**
 * Create the standard callback method
 *
 *
 * @param  {String}   requestName Displayed text in logs
 * @param  {Function} next        The function called on success
 *
 * @return {Function}             The callback function
 */
function createCallback(requestName, next) {

    /**
     * Try to parse the body from JSON to Object
     *
     *
     * @param  {String} body The body to parse
     *
     * @return {Object}      The object parsed or the body
     */
    var parse = function(body) {
        try {
            body = JSON.parse(body);
        } catch (e) {}
        return body;
    };

    /**
     * The standard action to do with the response of the freebox
     *
     *
     * @param  {Object} body The body response parsed as object
     */
    var loadResponse = function(body) {
        if (body.success) {
            saveInApp(body.result);
            if (next) {
                next.func(next.param);
            }
        } else {
            logger.error('Error returned by the freebox during ', requestName, ' : [', body.error_code, ']', body.msg);
        }
    };

    /**
     * Return the callback function
     */
    return function(error, response, body) {
        if (!error && response.statusCode === 200) {
            body = parse(body);
            loadResponse(body);
        } else {
            logger.error('Error during ', requestName, ' : ', error || ('status code : ' + response.statusCode));
        }
    };
}


/**
 * Request the authorization
 * And save result in freeboxOSClient.app
 *
 *
 * @param  {Function} next The function to call on success
 */
function requestAuthorization(next) {

    var tokenRequest = {
        'app_id': freeboxOSClient.app.app_id,
        'app_name': freeboxOSClient.app.app_name,
        'app_version': freeboxOSClient.app.app_version,
        'device_name': freeboxOSClient.app.device_name
    };

    var options = {
        url: freeboxOSClient.baseUrl + '/login/authorize',
        method: 'POST',
        json: tokenRequest,
        encode: 'utf-8'
    };

    /**
     *  Call the API
     */
    request(options, createCallback('requestAuthorization', next));
}


/**
 * Track authorization progress
 *
 *
 * @param  {Function} next The function to call on success
 */
function trackAuthorizationProgress(next) {

    var options = {
        url: freeboxOSClient.baseUrl + '/login/authorize/' + freeboxOSClient.app.track_id,
        method: 'GET',
        encode: 'utf-8'
    };

    /**
     *  Call the API
     */
    request(options, createCallback('trackAuthorizationProgress', next));
}



/**
 * Getting the challenge value
 *
 *
 * @param  {Function} next The function to call on success
 */
function getChallenge(next) {

    var options = {
        url: freeboxOSClient.baseUrl + '/login',
        method: 'GET',
        encode: 'utf-8'
    };

    /**
     *  Call the API
     */
    request(options, createCallback('getChallenge', next));
}



/**
 * Opening a session
 *
 *
 * @param  {Function} next The function to call on success
 */
function openSession(next) {

    var sessionStart = {
        app_id: freeboxOSClient.app.app_id,
        app_version: freeboxOSClient.app.app_version,
        password: crypto.createHmac('sha1', freeboxOSClient.app.app_token).update(freeboxOSClient.app.challenge).digest('hex')
    };

    var options = {
        url: freeboxOSClient.baseUrl + '/login/session',
        method: 'POST',
        json: sessionStart,
        encode: 'utf-8'
    };

    /**
     *  Call the API
     */
    request(options, createCallback('openSession', next));
}

/**
 * Create the authentication client
 *
 *
 * @param  {freeboxOSClient} client
 *
 * @return {authenticationFreeboxOSClient}        The freebox OS Client for the authentication
 */
function createAuthenticationClient(client) {
    freeboxOSClient = client;

    /**
     *  the authentication client
     */
    return {
        register: requestAuthorization,
        trackAuthorizationProgress: trackAuthorizationProgress,
        login: createCallSequence([getChallenge, openSession])
    };
}

module.exports = createAuthenticationClient;
