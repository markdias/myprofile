import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        // Color Palette - Sophisticated and Professional
        colorPrimary: '#1a365d', // Deep navy blue
        colorSuccess: '#38a169',
        colorWarning: '#d69e2e',
        colorError: '#e53e3e',
        colorInfo: '#3182ce',

        // Typography
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSizeHeading1: 48,
        fontSizeHeading2: 36,
        fontSizeHeading3: 28,
        fontSizeHeading4: 22,
        fontSizeHeading5: 18,
        fontSize: 16,

        // Spacing
        borderRadius: 8,
        controlHeight: 40,

        // Effects
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    components: {
        Button: {
            controlHeight: 44,
            borderRadius: 8,
            fontWeight: 500,
            primaryShadow: '0 4px 12px rgba(26, 54, 93, 0.3)',
        },
        Card: {
            borderRadiusLG: 12,
            boxShadowTertiary: '0 10px 30px rgba(0, 0, 0, 0.08)',
        },
        Input: {
            controlHeight: 44,
            borderRadius: 8,
        },
        Layout: {
            headerBg: '#ffffff',
            bodyBg: '#f7fafc',
        },
        Menu: {
            itemBorderRadius: 8,
        },
        Modal: {
            borderRadiusLG: 12,
        },
        Tabs: {
            itemActiveColor: '#1a365d',
            itemHoverColor: '#2d3748',
            inkBarColor: '#1a365d',
        },
    },
};

export default theme;
