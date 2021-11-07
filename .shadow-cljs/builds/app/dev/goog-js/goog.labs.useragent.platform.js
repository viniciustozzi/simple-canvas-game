["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/labs/useragent/platform.js"],"~:js","goog.loadModule(function(exports) {\n  \"use strict\";\n  goog.module(\"goog.labs.userAgent.platform\");\n  goog.module.declareLegacyNamespace();\n  const googString = goog.require(\"goog.string.internal\");\n  const util = goog.require(\"goog.labs.userAgent.util\");\n  function isAndroid() {\n    return util.matchUserAgent(\"Android\");\n  }\n  function isIpod() {\n    return util.matchUserAgent(\"iPod\");\n  }\n  function isIphone() {\n    return util.matchUserAgent(\"iPhone\") && !util.matchUserAgent(\"iPod\") && !util.matchUserAgent(\"iPad\");\n  }\n  function isIpad() {\n    return util.matchUserAgent(\"iPad\");\n  }\n  function isIos() {\n    return isIphone() || isIpad() || isIpod();\n  }\n  function isMacintosh() {\n    return util.matchUserAgent(\"Macintosh\");\n  }\n  function isLinux() {\n    return util.matchUserAgent(\"Linux\");\n  }\n  function isWindows() {\n    return util.matchUserAgent(\"Windows\");\n  }\n  function isChromeOS() {\n    return util.matchUserAgent(\"CrOS\");\n  }\n  function isChromecast() {\n    return util.matchUserAgent(\"CrKey\");\n  }\n  function isKaiOS() {\n    return util.matchUserAgentIgnoreCase(\"KaiOS\");\n  }\n  function getVersion() {\n    const userAgentString = util.getUserAgent();\n    let version = \"\", re;\n    if (isWindows()) {\n      re = /Windows (?:NT|Phone) ([0-9.]+)/;\n      const match = re.exec(userAgentString);\n      if (match) {\n        version = match[1];\n      } else {\n        version = \"0.0\";\n      }\n    } else {\n      if (isIos()) {\n        re = /(?:iPhone|iPod|iPad|CPU)\\s+OS\\s+(\\S+)/;\n        const match = re.exec(userAgentString);\n        version = match && match[1].replace(/_/g, \".\");\n      } else {\n        if (isMacintosh()) {\n          re = /Mac OS X ([0-9_.]+)/;\n          const match = re.exec(userAgentString);\n          version = match ? match[1].replace(/_/g, \".\") : \"10\";\n        } else {\n          if (isKaiOS()) {\n            re = /(?:KaiOS)\\/(\\S+)/i;\n            const match = re.exec(userAgentString);\n            version = match && match[1];\n          } else {\n            if (isAndroid()) {\n              re = /Android\\s+([^\\);]+)(\\)|;)/;\n              const match = re.exec(userAgentString);\n              version = match && match[1];\n            } else {\n              if (isChromeOS()) {\n                re = /(?:CrOS\\s+(?:i686|x86_64)\\s+([0-9.]+))/;\n                const match = re.exec(userAgentString);\n                version = match && match[1];\n              }\n            }\n          }\n        }\n      }\n    }\n    return version || \"\";\n  }\n  function isVersionOrHigher(version) {\n    return googString.compareVersions(getVersion(), version) >= 0;\n  }\n  exports = {getVersion, isAndroid, isChromeOS, isChromecast, isIos, isIpad, isIphone, isIpod, isKaiOS, isLinux, isMacintosh, isVersionOrHigher, isWindows,};\n  return exports;\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Closure user agent platform detection.\n * @see <a href=\"http://www.useragentstring.com/\">User agent strings</a>\n * For more information on browser brand, rendering engine, or device see the\n * other sub-namespaces in goog.labs.userAgent (browser, engine, and device\n * respectively).\n */\n\ngoog.module('goog.labs.userAgent.platform');\ngoog.module.declareLegacyNamespace();\n\nconst googString = goog.require('goog.string.internal');\nconst util = goog.require('goog.labs.userAgent.util');\n\n/**\n * @return {boolean} Whether the platform is Android.\n */\nfunction isAndroid() {\n  return util.matchUserAgent('Android');\n}\n\n/**\n * @return {boolean} Whether the platform is iPod.\n */\nfunction isIpod() {\n  return util.matchUserAgent('iPod');\n}\n\n/**\n * @return {boolean} Whether the platform is iPhone.\n */\nfunction isIphone() {\n  return util.matchUserAgent('iPhone') && !util.matchUserAgent('iPod') &&\n      !util.matchUserAgent('iPad');\n}\n\n/**\n * Returns whether the platform is iPad.\n * Note that iPadOS 13+ spoofs macOS Safari by default in its user agent, and in\n * this scenario the platform will not be recognized as iPad. If you must have\n * iPad-specific behavior, use\n * {@link goog.labs.userAgent.extra.isSafariDesktopOnMobile}.\n * @return {boolean} Whether the platform is iPad.\n */\nfunction isIpad() {\n  return util.matchUserAgent('iPad');\n}\n\n/**\n * Returns whether the platform is iOS.\n * Note that iPadOS 13+ spoofs macOS Safari by default in its user agent, and in\n * this scenario the platform will not be recognized as iOS. If you must have\n * iPad-specific behavior, use\n * {@link goog.labs.userAgent.extra.isSafariDesktopOnMobile}.\n * @return {boolean} Whether the platform is iOS.\n */\nfunction isIos() {\n  return isIphone() || isIpad() || isIpod();\n}\n\n/**\n * @return {boolean} Whether the platform is Mac.\n */\nfunction isMacintosh() {\n  return util.matchUserAgent('Macintosh');\n}\n\n/**\n * Note: ChromeOS is not considered to be Linux as it does not report itself\n * as Linux in the user agent string.\n * @return {boolean} Whether the platform is Linux.\n */\nfunction isLinux() {\n  return util.matchUserAgent('Linux');\n}\n\n/**\n * @return {boolean} Whether the platform is Windows.\n */\nfunction isWindows() {\n  return util.matchUserAgent('Windows');\n}\n\n/**\n * @return {boolean} Whether the platform is ChromeOS.\n */\nfunction isChromeOS() {\n  return util.matchUserAgent('CrOS');\n}\n\n/**\n * @return {boolean} Whether the platform is Chromecast.\n */\nfunction isChromecast() {\n  return util.matchUserAgent('CrKey');\n}\n\n/**\n * @return {boolean} Whether the platform is KaiOS.\n */\nfunction isKaiOS() {\n  return util.matchUserAgentIgnoreCase('KaiOS');\n}\n\n/**\n * The version of the platform. We only determine the version for Windows,\n * Mac, and Chrome OS. It doesn't make much sense on Linux. For Windows, we only\n * look at the NT version. Non-NT-based versions (e.g. 95, 98, etc.) are given\n * version 0.0.\n *\n * @return {string} The platform version or empty string if version cannot be\n *     determined.\n */\nfunction getVersion() {\n  const userAgentString = util.getUserAgent();\n  let version = '', re;\n  if (isWindows()) {\n    re = /Windows (?:NT|Phone) ([0-9.]+)/;\n    const match = re.exec(userAgentString);\n    if (match) {\n      version = match[1];\n    } else {\n      version = '0.0';\n    }\n  } else if (isIos()) {\n    re = /(?:iPhone|iPod|iPad|CPU)\\s+OS\\s+(\\S+)/;\n    const match = re.exec(userAgentString);\n    // Report the version as x.y.z and not x_y_z\n    version = match && match[1].replace(/_/g, '.');\n  } else if (isMacintosh()) {\n    re = /Mac OS X ([0-9_.]+)/;\n    const match = re.exec(userAgentString);\n    // Note: some old versions of Camino do not report an OSX version.\n    // Default to 10.\n    version = match ? match[1].replace(/_/g, '.') : '10';\n  } else if (isKaiOS()) {\n    re = /(?:KaiOS)\\/(\\S+)/i;\n    const match = re.exec(userAgentString);\n    version = match && match[1];\n  } else if (isAndroid()) {\n    re = /Android\\s+([^\\);]+)(\\)|;)/;\n    const match = re.exec(userAgentString);\n    version = match && match[1];\n  } else if (isChromeOS()) {\n    re = /(?:CrOS\\s+(?:i686|x86_64)\\s+([0-9.]+))/;\n    const match = re.exec(userAgentString);\n    version = match && match[1];\n  }\n  return version || '';\n}\n\n/**\n * @param {string|number} version The version to check.\n * @return {boolean} Whether the browser version is higher or the same as the\n *     given version.\n */\nfunction isVersionOrHigher(version) {\n  return googString.compareVersions(getVersion(), version) >= 0;\n}\n\nexports = {\n  getVersion,\n  isAndroid,\n  isChromeOS,\n  isChromecast,\n  isIos,\n  isIpad,\n  isIphone,\n  isIpod,\n  isKaiOS,\n  isLinux,\n  isMacintosh,\n  isVersionOrHigher,\n  isWindows,\n};\n","~:compiled-at",1636305701677,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.labs.useragent.platform.js\",\n\"lineCount\":90,\n\"mappings\":\"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\",\n\"sources\":[\"goog/labs/useragent/platform.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Closure user agent platform detection.\\n * @see <a href=\\\"http://www.useragentstring.com/\\\">User agent strings</a>\\n * For more information on browser brand, rendering engine, or device see the\\n * other sub-namespaces in goog.labs.userAgent (browser, engine, and device\\n * respectively).\\n */\\n\\ngoog.module('goog.labs.userAgent.platform');\\ngoog.module.declareLegacyNamespace();\\n\\nconst googString = goog.require('goog.string.internal');\\nconst util = goog.require('goog.labs.userAgent.util');\\n\\n/**\\n * @return {boolean} Whether the platform is Android.\\n */\\nfunction isAndroid() {\\n  return util.matchUserAgent('Android');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is iPod.\\n */\\nfunction isIpod() {\\n  return util.matchUserAgent('iPod');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is iPhone.\\n */\\nfunction isIphone() {\\n  return util.matchUserAgent('iPhone') && !util.matchUserAgent('iPod') &&\\n      !util.matchUserAgent('iPad');\\n}\\n\\n/**\\n * Returns whether the platform is iPad.\\n * Note that iPadOS 13+ spoofs macOS Safari by default in its user agent, and in\\n * this scenario the platform will not be recognized as iPad. If you must have\\n * iPad-specific behavior, use\\n * {@link goog.labs.userAgent.extra.isSafariDesktopOnMobile}.\\n * @return {boolean} Whether the platform is iPad.\\n */\\nfunction isIpad() {\\n  return util.matchUserAgent('iPad');\\n}\\n\\n/**\\n * Returns whether the platform is iOS.\\n * Note that iPadOS 13+ spoofs macOS Safari by default in its user agent, and in\\n * this scenario the platform will not be recognized as iOS. If you must have\\n * iPad-specific behavior, use\\n * {@link goog.labs.userAgent.extra.isSafariDesktopOnMobile}.\\n * @return {boolean} Whether the platform is iOS.\\n */\\nfunction isIos() {\\n  return isIphone() || isIpad() || isIpod();\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is Mac.\\n */\\nfunction isMacintosh() {\\n  return util.matchUserAgent('Macintosh');\\n}\\n\\n/**\\n * Note: ChromeOS is not considered to be Linux as it does not report itself\\n * as Linux in the user agent string.\\n * @return {boolean} Whether the platform is Linux.\\n */\\nfunction isLinux() {\\n  return util.matchUserAgent('Linux');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is Windows.\\n */\\nfunction isWindows() {\\n  return util.matchUserAgent('Windows');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is ChromeOS.\\n */\\nfunction isChromeOS() {\\n  return util.matchUserAgent('CrOS');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is Chromecast.\\n */\\nfunction isChromecast() {\\n  return util.matchUserAgent('CrKey');\\n}\\n\\n/**\\n * @return {boolean} Whether the platform is KaiOS.\\n */\\nfunction isKaiOS() {\\n  return util.matchUserAgentIgnoreCase('KaiOS');\\n}\\n\\n/**\\n * The version of the platform. We only determine the version for Windows,\\n * Mac, and Chrome OS. It doesn't make much sense on Linux. For Windows, we only\\n * look at the NT version. Non-NT-based versions (e.g. 95, 98, etc.) are given\\n * version 0.0.\\n *\\n * @return {string} The platform version or empty string if version cannot be\\n *     determined.\\n */\\nfunction getVersion() {\\n  const userAgentString = util.getUserAgent();\\n  let version = '', re;\\n  if (isWindows()) {\\n    re = /Windows (?:NT|Phone) ([0-9.]+)/;\\n    const match = re.exec(userAgentString);\\n    if (match) {\\n      version = match[1];\\n    } else {\\n      version = '0.0';\\n    }\\n  } else if (isIos()) {\\n    re = /(?:iPhone|iPod|iPad|CPU)\\\\s+OS\\\\s+(\\\\S+)/;\\n    const match = re.exec(userAgentString);\\n    // Report the version as x.y.z and not x_y_z\\n    version = match && match[1].replace(/_/g, '.');\\n  } else if (isMacintosh()) {\\n    re = /Mac OS X ([0-9_.]+)/;\\n    const match = re.exec(userAgentString);\\n    // Note: some old versions of Camino do not report an OSX version.\\n    // Default to 10.\\n    version = match ? match[1].replace(/_/g, '.') : '10';\\n  } else if (isKaiOS()) {\\n    re = /(?:KaiOS)\\\\/(\\\\S+)/i;\\n    const match = re.exec(userAgentString);\\n    version = match && match[1];\\n  } else if (isAndroid()) {\\n    re = /Android\\\\s+([^\\\\);]+)(\\\\)|;)/;\\n    const match = re.exec(userAgentString);\\n    version = match && match[1];\\n  } else if (isChromeOS()) {\\n    re = /(?:CrOS\\\\s+(?:i686|x86_64)\\\\s+([0-9.]+))/;\\n    const match = re.exec(userAgentString);\\n    version = match && match[1];\\n  }\\n  return version || '';\\n}\\n\\n/**\\n * @param {string|number} version The version to check.\\n * @return {boolean} Whether the browser version is higher or the same as the\\n *     given version.\\n */\\nfunction isVersionOrHigher(version) {\\n  return googString.compareVersions(getVersion(), version) >= 0;\\n}\\n\\nexports = {\\n  getVersion,\\n  isAndroid,\\n  isChromeOS,\\n  isChromecast,\\n  isIos,\\n  isIpad,\\n  isIphone,\\n  isIpod,\\n  isKaiOS,\\n  isLinux,\\n  isMacintosh,\\n  isVersionOrHigher,\\n  isWindows,\\n};\\n\"],\n\"names\":[\"goog\",\"module\",\"declareLegacyNamespace\",\"googString\",\"require\",\"util\",\"isAndroid\",\"matchUserAgent\",\"isIpod\",\"isIphone\",\"isIpad\",\"isIos\",\"isMacintosh\",\"isLinux\",\"isWindows\",\"isChromeOS\",\"isChromecast\",\"isKaiOS\",\"matchUserAgentIgnoreCase\",\"getVersion\",\"userAgentString\",\"getUserAgent\",\"version\",\"re\",\"match\",\"exec\",\"replace\",\"isVersionOrHigher\",\"compareVersions\",\"exports\"]\n}\n"]