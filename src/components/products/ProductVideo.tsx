interface Props {
  url: string;
  provider?: string | null;
  title?: string;
}

/**
 * Embeds a product demo video. Supports YouTube, Vimeo, Yandex (dzen.ru, video.yandex),
 * and direct mp4. The provider hint comes from the admin form; if missing we sniff
 * the URL.
 */
export function ProductVideo({ url, provider, title }: Props) {
  if (!url) return null;

  const sniffed = provider || (() => {
    if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
    if (/vimeo\.com/.test(url)) return 'vimeo';
    if (/dzen\.ru|yandex\./.test(url)) return 'yandex';
    if (/\.mp4($|\?)/i.test(url)) return 'mp4';
    return 'iframe';
  })();

  if (sniffed === 'mp4') {
    return (
      <div className="aspect-video w-full bg-black overflow-hidden rounded">
        <video src={url} controls className="w-full h-full object-cover" preload="metadata" />
      </div>
    );
  }

  const embedUrl = (() => {
    if (sniffed === 'youtube') {
      const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
      const id = m?.[1];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (sniffed === 'vimeo') {
      const m = url.match(/vimeo\.com\/(\d+)/);
      return m?.[1] ? `https://player.vimeo.com/video/${m[1]}` : url;
    }
    return url;
  })();

  return (
    <div className="aspect-video w-full bg-black overflow-hidden rounded">
      <iframe
        src={embedUrl}
        title={title || 'Product video'}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
