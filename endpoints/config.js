module.exports = [{
    name: 'updateConfig',
    options: {
        url: '/downloads/config',
        method: 'PUT'
    }
}, {
    name: 'changeSpeed',
    options: {
        url: '/downloads/throttling',
        method: 'PUT'
    }
}, {
    name: 'reboot',
    options: {
        url: '/system/reboot',
        method: 'POST'
    }
}];