var gulp = require( 'gulp' ),
	combinemq = require( 'gulp-combine-media-queries' ),
	livereload = require( 'gulp-livereload' ),
	minifycss = require( 'gulp-minify-css' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-ruby-sass' );

gulp.task( 'styles', function ( ) {
	return gulp.src( 'source/sass/main.scss' )
		.pipe( sass( { lineNumbers: true, cacheLocation: 'tmp/sass-cache' } ) )
		.pipe( gulp.dest( 'public/styles' ) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( combinemq( { log: true } ) )
		.pipe( minifycss() )
		.pipe( gulp.dest( 'public/styles' ) );
} );

gulp.task( 'watch', function ( ) {
	var server = livereload();
	
	gulp.watch( 'source/sass/**/*.scss', [ 'styles' ] );
	gulp.watch( 'public/styles/**/*.css' ).on( 'change', function ( file ) { server.changed( file.path ); } );
} );

gulp.task( 'default', [ 'styles', 'watch' ] );