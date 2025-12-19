export default ({ strapi }) => {
  console.log(
    "User Attributes:",
    Object.keys(
      strapi.contentTypes["plugin::users-permissions.user"].attributes
    )
  );
};
