export default defineConfig({
  plugins: [react()],
  server: {
    proxy: process.env.NODE_ENV === "development"
      ? {
          "/api": {
            target: "https://deepfake-api-c598.onrender.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        }
      : undefined,
  },
});
