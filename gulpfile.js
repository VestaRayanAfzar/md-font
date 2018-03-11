const execSync = require("child_process").execSync;
const gulp = require("gulp");
const rimraf = require("rimraf");

gulp.task("clean", () => {
    return rimraf.sync("package");
});

gulp.task("fonts", ["clean"], () => {
    return gulp.src("node_modules/material-design-icons/iconfont/**/*")
        .pipe(gulp.dest("package"));
});

gulp.task("assets", ["fonts"], () => {
    return gulp.src(["package.json", "README.md"])
        .pipe(gulp.dest("package"));
});

gulp.task("default", ["assets"]);

gulp.task("deploy", ["default"], () => {
    execSync("npm publish --access=public", {
        stdio: "inherit",
        cwd: `${__dirname}/package`
    });
})