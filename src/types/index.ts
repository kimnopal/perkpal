export interface Image {
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
}

export interface PerkLogo {
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
}

export interface PerkImage {
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
}

export interface Perk {
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  logo: PerkLogo;
  redemption_method: string;
  redemption_value: string;
  valid_from: string;
  valid_to: string;
  featured: boolean;
  og_image: PerkImage;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  sub_categories?: SubCategory[];
  updatedAt: string;
  publishedAt: string;
}

export interface FAQ {
  title: string;
  description: string;
}

export interface SEO {
  meta_title: string;
  meta_description: string;
}

export interface Link {
  href: string;
}

export interface Navbar {
  NavItem: NavItem[];
}

export interface NavItem {
  title: string;
  link: Link;
}

export interface NavIcon {
  icon: string; // SVG markup, image URL, or class name
  link: Link;
}

export interface Footer {
  icon: Image;
  description: string;
  FooterNav: FooterNav[];
  NavIcon: NavIcon[];
  copyright: string;
}

export interface FooterNav {
  nav_header: string;
  NavItem: NavItem[];
}
