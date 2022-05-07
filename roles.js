const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")

  ac.grant("hospital")
    .extend("basic")
    .readAny("profile")

  ac.grant("admin")
    .extend("basic")
    .extend("hospital")
    .updateAny("profile")
    .deleteAny("profile")

  return ac;
})();
