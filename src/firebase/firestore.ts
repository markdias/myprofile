import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    Timestamp,
    writeBatch,
    setDoc
} from 'firebase/firestore';
import { db } from './config';
import { Project, Section, ContactMessage } from '../types';

// Helper function to remove undefined values from objects
// Firestore doesn't support undefined values, so we need to remove them
const sanitizeData = <T extends Record<string, any>>(data: T): Partial<T> => {
    const sanitized: any = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            sanitized[key] = data[key];
        }
    });
    return sanitized;
};

// ============= PROJECTS =============

export const getProjects = async (): Promise<Project[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
        })) as Project[];
    } catch (error) {
        console.error('Error getting projects:', error);
        return [];
    }
};

export const getProject = async (id: string): Promise<Project | null> => {
    try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate(),
                updatedAt: docSnap.data().updatedAt?.toDate()
            } as Project;
        }
        return null;
    } catch (error) {
        console.error('Error getting project:', error);
        return null;
    }
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    try {
        const sanitizedProject = sanitizeData(project);
        const docRef = await addDoc(collection(db, 'projects'), {
            ...sanitizedProject,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating project:', error);
        return null;
    }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<boolean> => {
    try {
        const sanitizedProject = sanitizeData(project);
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, {
            ...sanitizedProject,
            updatedAt: Timestamp.now()
        });
        return true;
    } catch (error) {
        console.error('Error updating project:', error);
        return false;
    }
};

export const deleteProject = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, 'projects', id));
        return true;
    } catch (error) {
        console.error('Error deleting project:', error);
        return false;
    }
};

// ============= SECTIONS =============

export const getSections = async (): Promise<Section[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'sections'));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
        })) as Section[];
    } catch (error) {
        console.error('Error getting sections:', error);
        return [];
    }
};

export const getVisibleSections = async (): Promise<Section[]> => {
    try {
        const q = query(
            collection(db, 'sections'),
            where('visible', '==', true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
        })) as Section[];
    } catch (error) {
        console.error('Error getting visible sections:', error);
        return [];
    }
};

export const getSection = async (id: string): Promise<Section | null> => {
    try {
        const docRef = doc(db, 'sections', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate(),
                updatedAt: docSnap.data().updatedAt?.toDate()
            } as Section;
        }
        return null;
    } catch (error) {
        console.error('Error getting section:', error);
        return null;
    }
};

export const createSection = async (section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    try {
        const sanitizedSection = sanitizeData(section);
        const docRef = await addDoc(collection(db, 'sections'), {
            ...sanitizedSection,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating section:', error);
        return null;
    }
};

export const updateSection = async (id: string, section: Partial<Section>): Promise<boolean> => {
    try {
        const sanitizedSection = sanitizeData(section);
        const docRef = doc(db, 'sections', id);
        await updateDoc(docRef, {
            ...sanitizedSection,
            updatedAt: Timestamp.now()
        });
        return true;
    } catch (error) {
        console.error('Error updating section:', error);
        return false;
    }
};

export const deleteSection = async (id: string): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, 'sections', id));
        return true;
    } catch (error) {
        console.error('Error deleting section:', error);
        return false;
    }
};

export const reorderSections = async (sections: { id: string; order: number }[]): Promise<boolean> => {
    try {
        const batch = writeBatch(db);
        sections.forEach(({ id, order }) => {
            const docRef = doc(db, 'sections', id);
            batch.update(docRef, { order, updatedAt: Timestamp.now() });
        });
        await batch.commit();
        return true;
    } catch (error) {
        console.error('Error reordering sections:', error);
        return false;
    }
};

// ============= CONTACT MESSAGES =============

export const createContactMessage = async (message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(db, 'messages'), {
            ...message,
            read: false,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating message:', error);
        return null;
    }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
    try {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        })) as ContactMessage[];
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
};

export const markMessageAsRead = async (id: string): Promise<boolean> => {
    try {
        const docRef = doc(db, 'messages', id);
        await updateDoc(docRef, { read: true });
        return true;
    } catch (error) {
        console.error('Error marking message as read:', error);
        return false;
    }
};

// ============= SITE CONTENT =============

import type { HeroContent, AboutContent, ContactContent, SiteSettings, SiteContentSection } from '../types';

// Default content for new installations
const defaultHeroContent: HeroContent = {
    title: 'Welcome to My Portfolio',
    subtitle: 'I create amazing digital experiences',
    cta1Text: 'View Projects',
    cta1Link: '#projects',
    cta2Text: 'Contact Me',
    cta2Link: '#contact',
    stats: [
        { label: 'Projects Completed', value: '50+' },
        { label: 'Happy Clients', value: '30+' },
        { label: 'Years Experience', value: '5+' }
    ]
};

const defaultAboutContent: AboutContent = {
    heading: 'About Me',
    description: 'I am a passionate developer with expertise in creating modern web applications.',
    skills: [
        { name: 'JavaScript', percentage: 90 },
        { name: 'React', percentage: 85 },
        { name: 'TypeScript', percentage: 80 },
        { name: 'Node.js', percentage: 75 }
    ]
};

const defaultContactContent: ContactContent = {
    title: 'Get In Touch',
    description: 'Feel free to reach out for collaborations or just a friendly chat.',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567'
};

const defaultSiteSettings: SiteSettings = {
    siteTitle: 'My Portfolio',
    navLinks: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' }
    ],
    socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' }
    ]
};

const getDefaultContent = (section: SiteContentSection): any => {
    switch (section) {
        case 'hero':
            return defaultHeroContent;
        case 'about':
            return defaultAboutContent;
        case 'contact':
            return defaultContactContent;
        case 'settings':
            return defaultSiteSettings;
        default:
            return {};
    }
};

export const getSiteContent = async <T = any>(section: SiteContentSection): Promise<T | null> => {
    try {
        const docRef = doc(db, 'site_content', section);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as T;
        } else {
            // Return default content if document doesn't exist
            return getDefaultContent(section) as T;
        }
    } catch (error) {
        console.error(`Error getting ${section} content:`, error);
        return getDefaultContent(section) as T;
    }
};

export const updateSiteContent = async (
    section: SiteContentSection,
    data: HeroContent | AboutContent | ContactContent | SiteSettings
): Promise<boolean> => {
    try {
        const docRef = doc(db, 'site_content', section);
        const sanitizedData = sanitizeData(data);

        // Check if document exists
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, sanitizedData);
        } else {
            // Create new document with the section ID
            await setDoc(docRef, {
                ...sanitizedData,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
        }

        return true;
    } catch (error) {
        console.error(`Error updating ${section} content:`, error);
        return false;
    }
};

// Initialize site content with defaults (call this once during setup)
export const initializeSiteContent = async (): Promise<boolean> => {
    try {
        const batch = writeBatch(db);
        const sections: SiteContentSection[] = ['hero', 'about', 'contact', 'settings'];

        for (const section of sections) {
            const docRef = doc(db, 'site_content', section);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                batch.set(docRef, {
                    ...getDefaultContent(section),
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                });
            }
        }

        await batch.commit();
        return true;
    } catch (error) {
        console.error('Error initializing site content:', error);
        return false;
    }
};
