export default (plugin) => {
  plugin.controllers.auth.register = async (ctx) => {
    const {
      username,
      email,
      password,
      name,
      surname,
      dateOfBirth,
      gender,
      documentNumber,
      documentExpiry,
      phoneNumber,
    } = ctx.request.body;

    const pluginStore = await strapi.store({
      type: "plugin",
      name: "users-permissions",
    });
    const settings: any = await pluginStore.get({ key: "advanced" });

    if (!settings.allow_register) {
      return ctx.badRequest("Register action is currently disabled");
    }

    const params: any = {
      username,
      email,
      password,
      name,
      surname,
      dateOfBirth,
      gender,
      documentNumber,
      documentExpiry,
      phoneNumber,
      provider: "local",
      confirmed: settings.email_confirmation ? false : true,
    };

    const role = await strapi.query("plugin::users-permissions.role").findOne({
      where: { type: settings.default_role || "authenticated" },
    });

    if (role) {
      params.role = role.id;
    }

    try {
      const user = await strapi.query("plugin::users-permissions.user").create({
        data: params,
      });

      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });

      return ctx.send({
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err: any) {
      return ctx.badRequest(err.message || "Registration Error");
    }
  };

  return plugin;
};
