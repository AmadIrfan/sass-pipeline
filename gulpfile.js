// @ts-nocheck

import pkg from "gulp";
const { watch, src, dest, series } = pkg;
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import imagemin, { mozjpeg, optipng } from "gulp-imagemin";
import webp from "gulp-webp";

const sass = gulpSass(dartSass);

function compileSass() {
	return src("src/sass/*.sass")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(dest("./dist/"));
}

function jsMin() {
	return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

function optimizing() {
	return src("src/images/*.{jpg,png}").pipe(
		imagemin(
			mozjpeg({ quality: 80, progressive: true }),
			optipng({ optimizationLevel: 2 })
		)
	);
}

function webPImage() {
	return src("src/images/*.{jpg,png}").pipe(webp()).pipe(dest("dist/images"));
}

function watchTask() {
	watch("src/sass/*.sass", compileSass);
	// watch("src/js/*.js", jsMin);
	// watch("src/images/*.{jpg,png}", optimizing);
	// watch("src/images/*.{jpg,png}", webPImage);
}
// jsMin, optimizing, webPImage,
export default series(compileSass, watchTask);
