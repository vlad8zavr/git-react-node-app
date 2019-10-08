module.exports = {
    baseUrl: 'http://localhost:3000/api/repos',
    gridUrl: 'http://localhost:4444/wd/hub',

    sets: {
        desktop: {
            files: 'testIntegration/desktop'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
}