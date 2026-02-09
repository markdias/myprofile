// Portfolio Project
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    imageUrl: string;
    images?: string[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    order?: number;
    createdAt: Date;
    updatedAt: Date;
}

// Dynamic Section System
export enum ComponentType {
    TEXT_BLOCK = 'text_block',
    IMAGE_GALLERY = 'image_gallery',
    VIDEO_EMBED = 'video_embed',
    STATS_COUNTER = 'stats_counter',
    TIMELINE = 'timeline',
    SKILLS_GRID = 'skills_grid',
    TESTIMONIALS = 'testimonials',
    CTA_BUTTON = 'cta_button',
    DIVIDER = 'divider',
    CUSTOM_HTML = 'custom_html'
}

export interface ComponentConfig {
    type: ComponentType;
    config: any; // Type-specific configuration
    styles?: {
        backgroundColor?: string;
        textColor?: string;
        padding?: string;
        margin?: string;
        alignment?: 'left' | 'center' | 'right';
    };
}

export interface Section {
    id: string;
    title: string;
    slug: string;
    order: number;
    visible: boolean;
    components: ComponentConfig[];
    createdAt: Date;
    updatedAt: Date;
}

// Component-specific configurations
export interface TextBlockConfig {
    content: string; // HTML content
    heading?: string;
}

export interface ImageGalleryConfig {
    images: Array<{
        url: string;
        caption?: string;
        alt?: string;
    }>;
    columns?: number;
}

export interface VideoEmbedConfig {
    url: string; // YouTube or Vimeo URL
    title?: string;
    autoplay?: boolean;
}

export interface StatsCounterConfig {
    stats: Array<{
        value: number;
        label: string;
        icon?: string;
        suffix?: string;
    }>;
}

export interface TimelineItem {
    title: string;
    subtitle?: string;
    date: string;
    description?: string;
}

export interface TimelineConfig {
    items: TimelineItem[];
}

export interface Skill {
    name: string;
    level: number; // 0-100
    icon?: string;
}

export interface SkillsGridConfig {
    skills: Skill[];
    columns?: number;
}

export interface Testimonial {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    imageUrl?: string;
}

export interface TestimonialsConfig {
    testimonials: Testimonial[];
    autoplay?: boolean;
}

export interface CTAButtonConfig {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    openInNewTab?: boolean;
}

export interface DividerConfig {
    style?: 'solid' | 'dashed' | 'dotted';
    thickness?: number;
    color?: string;
}

export interface CustomHTMLConfig {
    html: string;
}

// Contact Form
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    read?: boolean;
}

// Auth
export interface User {
    uid: string;
    email: string | null;
    displayName?: string | null;
}

// Site Content Management
export interface HeroContent {
    title: string;
    subtitle: string;
    cta1Text: string;
    cta1Link: string;
    cta2Text?: string;
    cta2Link?: string;
    stats: Array<{ label: string; value: string }>;
}

export interface AboutContent {
    heading: string;
    description: string;
    skills: Array<{ name: string; percentage: number }>;
}

export interface ContactContent {
    title: string;
    description: string;
    email?: string;
    phone?: string;
    location?: string;
}

export interface SiteSettings {
    siteTitle: string;
    logoUrl?: string;
    navLinks: Array<{ label: string; href: string }>;
    socialLinks: Array<{ platform: string; url: string; icon?: string }>;
    resumeUrl?: string;
}

export type SiteContentSection = 'hero' | 'about' | 'contact' | 'settings';
