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
  question: string;
  answer: string;
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

// Journal types
export interface JournalAuthor {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface JournalCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface JournalTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface JournalContentText {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface JournalContentNode {
  type: "heading" | "paragraph" | "list" | "list-item";
  level?: number;
  format?: "ordered" | "unordered";
  children: JournalContentText[];
}

export interface Journal {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  date: string;
  preface: string
  content: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: JournalCategory;
  author: JournalAuthor;
  banner: Image;
  featured: boolean;
  tags: JournalTag[];
}
