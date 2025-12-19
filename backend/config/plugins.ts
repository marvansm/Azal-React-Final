export default () => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: [
          "name",
          "surname",
          "dateOfBirth",
          "gender",
          "documentNumber",
          "documentExpiry",
          "phoneNumber",
        ],
      },
    },
  },
});
