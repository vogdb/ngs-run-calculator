var path = require('path');
var fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const BUILD_PATH = 'build';
const ANDROID_PATH = path.join('src', 'android');
const ANDROID_ASSETS_PATH = path.join(ANDROID_PATH, 'app', 'src', 'main', 'assets');

fs.pathExists(path.join(BUILD_PATH, 'static'))
  .then(function (exists) {
    if (exists) {
      return Promise.resolve({});
    } else {
      return exec('yarn build');
    }
  })
  .then(function ({stdout, stderr}) {
    if (stderr) {
      return Promise.reject(stderr);
    } else {
      return fs.copy(BUILD_PATH, ANDROID_ASSETS_PATH)
    }
  })
  .then(function () {
    return exec('./gradlew build', {cwd: ANDROID_PATH});
  })
  .then(function () {
    console.log('Important!');
    console.log('Don\'t forget to set version in "package.json" and versionCode in "src/android/app/build.gradle"');
  });

