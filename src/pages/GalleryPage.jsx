import { useMemo } from "react";

const importGalleryImages = () => {
  try {
    const context = require.context(
      "../assets/gallery_images",
      false,
      /\.(png|jpe?g|gif|webp|svg)$/
    );
    return context.keys().map((key) => {
      const src = context(key);
      const fileName = key.replace("./", "");
      const label = fileName
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return {
        src,
        alt: label ? `${label} – gallery` : "Gallery image",
      };
    });
  } catch (error) {
    console.error("Unable to load gallery images:", error);
    return [];
  }
};

const GalleryPage = () => {
  const images = useMemo(() => importGalleryImages(), []);

  return (
    <section id="gallery" className="py-10 space-y-6">
      <div className="space-y-2 text-white">
        <h2 className="text-2xl font-heading text-[#B46A3C] border-b-4 border-[#B46A3C] inline-block pb-1">
          Gallery
        </h2>
        <p className="text-white/80 max-w-3xl">
          
        </p>
      </div>

      {images.length === 0 ? (
        <p className="text-white/70">No gallery images available yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className="mb-6 rounded-3xl border border-primary/20 bg-[#0f1316] overflow-hidden shadow-xl"
              style={{ breakInside: "avoid" }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto block rounded-2xl"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};

export default GalleryPage;
