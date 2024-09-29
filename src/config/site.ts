export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TripAdvisor",
  description:
    "The Travel Tips & Destination Guides platform is designed to build an engaging community of travel enthusiasts, enabling users to share their personal travel stories, exchange valuable tips, and interact with fellow travellers. The platform provides user authentication and registration, allowing users to personalize their profiles, follow others, and contribute their own travel content. Additionally, it offers premium content access via payment integration for exclusive features. By combining informative travel content with social interactions, this project aims to empower users to make informed travel decisions, discover new destinations, and create memorable travel experiences.",
  icon: "/favicon.ico",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    }
  ],
};
