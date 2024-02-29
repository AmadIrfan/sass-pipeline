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
    .pipe(sass()) // Specify sass compiler here too
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(dest("dist/css"));
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
  watch("src/js/*.js", jsMin);
  watch("src/images/*.{jpg,png}", optimizing);
  watch("src/images/*.{jpg,png}", webPImage);
}

export default series(compileSass, jsMin, optimizing, webPImage, watchTask);
