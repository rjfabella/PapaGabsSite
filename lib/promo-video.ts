export const promoVideo = {
  id: "_R6xFaKtGeI",
  title: "Why More Travelers Need to Discover ROMBLON",
  channel: "Romblon Islands",
  url: "https://www.youtube.com/watch?v=_R6xFaKtGeI",
  get thumbnail() {
    return `https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`;
  },
  get embedUrl() {
    // youtube-nocookie.com defers third-party cookies/tracking until playback starts
    return `https://www.youtube-nocookie.com/embed/${this.id}?autoplay=1&rel=0`;
  },
};
