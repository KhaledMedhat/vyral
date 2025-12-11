import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => {
  //   const token = req.headers["authorization"]?.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
  const token = req.headers.get("access_token");
  if (!token) {
    return { authenticated: false }; // No token means not authenticated
  }

  // If a token exists, you can consider the user authenticated
  return { authenticated: true }; // Optionally return the token or other info
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug

  singleImageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { authenticated: user.authenticated };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.authenticated);

      // console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { isAuthenticated: metadata.authenticated };
    }),
  chatInputUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "128MB",
      maxFileCount: 6,
    },
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
    },
    audio: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "128MB",
      maxFileCount: 5,
    },
    text: {
      maxFileSize: "128MB",
      maxFileCount: 5,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { authenticated: user.authenticated };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.authenticated);

      // console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { isAuthenticated: metadata.authenticated };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
