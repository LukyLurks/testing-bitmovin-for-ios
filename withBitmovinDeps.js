const {
  withProjectBuildGradle,
  withDangerousMod,
} = require("@expo/config-plugins");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

module.exports = (config) => {
  // adding deps for Android
  withProjectBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /(\s+)(maven\s?\{.*\})/,
      `$1$2$1maven { url 'https://artifacts.bitmovin.com/artifactory/public-releases' }`
    );
    return config;
  });

  // adding deps for iOS
  withDangerousMod(config, [
    "ios",
    (config) => {
      const { platformProjectRoot } = config.modRequest;
      const contents = readFileSync(
        join(platformProjectRoot, "Podfile"),
        "utf-8"
      );

      writeFileSync(
        join(platformProjectRoot, "Podfile"),
        contents.replace(
          /((?:^require .*\n\s*))(?!(?:^require))/m,
          `$1\nsource 'https://github.com/bitmovin/cocoapod-specs.git'\n\n`
        )
      );
      return config;
    },
  ]);
  return config;
};
