export default {
  methods: {
    useInstallationName(str = "Infinizi", installationName) {
      return str.replace(/Infinizi/g, installationName);
    },
  },
};
