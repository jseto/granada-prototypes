'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var browserSync = require( 'browser-sync' );

gulp.task('server:start', ['browser-sync']);

gulp.task('browser-sync', function() {
	var segmentsRoute = require('./server-middleware.js');
	
	browserSync({
		server: {
			baseDir: path.client,
			routes: {
				'/': path.client,
			},
			middleware: segmentsRoute
		},
		notify: false,
		open: false,
		port: project.port
	});
});

gulp.task('server:reload', ['browser-sync'], function(){
	gulp.watch(	project.watch.servedFiles, browserSync.reload );
});

gulp.task('develop', ['server:reload', 'watch:test:unit']);

gulp.task('develop:ts', ['develop', 'watch:ts']);
