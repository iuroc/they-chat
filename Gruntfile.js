module.exports = grunt => {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['dist/public/src/index.js'],
                tasks: ['exec:build'],
                options: { spawn: false }
            }
        },
        exec: {
            build: 'browserify dist/public/src/index.js -o dist/public/src/bundle.js'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-exec')
    grunt.registerTask('default', ['watch'])
}