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
            build: 'yarn run build'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-exec')
    grunt.registerTask('default', ['watch'])
}